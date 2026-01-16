# app/utils/llm_helper.py
"""
Reusable LLM helper using OpenRouter API.
Extracted from summary.py to avoid duplication.
"""
import os
import requests
import json
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

# OpenRouter configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("MODEL", "google/gemma-3-4b-it:free")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def call_llm(
    prompt: str,
    max_tokens: int = 2000,
    temperature: float = 0.3,
    system_message: Optional[str] = None
) -> Optional[str]:
    """
    Call OpenRouter LLM API with the given prompt.
    
    Args:
        prompt: User prompt to send to LLM
        max_tokens: Maximum tokens in response
        temperature: Sampling temperature (0.0 to 1.0)
        system_message: Optional system message for context
        
    Returns:
        LLM response content or None if request fails
        
    Raises:
        ValueError: If API key is not configured
        requests.RequestException: If API request fails
    """
    if not OPENROUTER_API_KEY:
        logger.error("OPENROUTER_API_KEY not found in environment")
        raise ValueError("OpenRouter API key not configured")
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://openrouter.ai"
    }
    
    messages = []
    if system_message:
        messages.append({"role": "system", "content": system_message})
    messages.append({"role": "user", "content": prompt})
    
    payload = {
        "model": OPENROUTER_MODEL,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature
    }
    
    try:
        response = requests.post(OPENROUTER_URL, json=payload, headers=headers, timeout=60)
        
        # Log response for debugging
        logger.info(f"OpenRouter response status: {response.status_code}")
        logger.debug(f"OpenRouter full response: {response.text[:500]}")
        
        if response.status_code != 200:
            logger.error(f"OpenRouter API error: {response.status_code} - {response.text}")
            raise requests.RequestException(f"OpenRouter error: {response.text}")
        
        response_json = response.json()
        logger.debug(f"Response JSON keys: {response_json.keys()}")
        
        # Check if response has choices
        if not response_json.get("choices") or len(response_json["choices"]) == 0:
            logger.error(f"OpenRouter returned empty choices. Full response: {response.text}")
            raise ValueError("Model returned empty response")
        
        # Check if message exists
        message = response_json["choices"][0].get("message", {})
        logger.debug(f"Message keys: {message.keys()}")
        
        content = message.get("content", "")
        
        if not content or content.strip() == "":
            logger.error(f"OpenRouter returned empty content. Full response: {response.text}")
            raise ValueError("Model returned empty content")
        
        logger.info(f"Received response from OpenRouter ({len(content)} chars)")
        return content
        
    except requests.Timeout:
        logger.error("OpenRouter API request timed out")
        raise requests.RequestException("OpenRouter API request timed out")
    except requests.RequestException as e:
        logger.error(f"OpenRouter API request failed: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error calling OpenRouter: {str(e)}", exc_info=True)
        raise ValueError("Invalid response format from OpenRouter")


def parse_json_response(content: str) -> Dict[str, Any]:
    """
    Parse JSON from LLM response, handling markdown code blocks and common errors.
    
    Args:
        content: LLM response content
        
    Returns:
        Parsed JSON dictionary
        
    Raises:
        json.JSONDecodeError: If content is not valid JSON
    """
    # Remove markdown code fences if present
    if content.startswith("```"):
        # Remove opening fence
        content = content.split("```", 1)[1]
        # Remove language identifier (e.g., 'json')
        if content.startswith("json"):
            content = content[4:]
        # Remove closing fence
        if "```" in content:
            content = content.rsplit("```", 1)[0]
        content = content.strip()
    
    # Clean up common AI JSON errors
    import re
    
    # Remove trailing commas before closing braces/brackets
    content = re.sub(r',(\s*[}\]])', r'\1', content)
    
    # Remove any text after the final closing brace
    # and find the start of the JSON object
    first_brace = content.find('{')
    if first_brace != -1:
        content = content[first_brace:]
        
    last_brace = content.rfind('}')
    if last_brace != -1:
        content = content[:last_brace+1]
    
    # Simple fix for trailing commas
    content = re.sub(r',(\s*[}\]])', r'\1', content)

    
    content = content.strip()
    
    try:
        return json.loads(content)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing failed: {str(e)}")
        logger.error(f"Error at position {e.pos}")
        logger.debug(f"Content around error: {content[max(0, e.pos-100):min(len(content), e.pos+100)]}")
        logger.debug(f"Full content length: {len(content)}")
        raise
