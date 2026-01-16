# app/utils/resume_parser.py
"""
AI-based resume parsing using OpenRouter LLM.
Extracts structured portfolio data from resume text.
"""
import json
import logging
from typing import Dict, Any
from app.schemas.resume import ResumeExtractedData
from app.utils.llm_helper import call_llm, parse_json_response

logger = logging.getLogger(__name__)

# Resume parsing prompt template
RESUME_PARSING_PROMPT = """Extract ALL information from this resume and return ONLY valid JSON.

Resume:
{resume_text}

Extract:
- ALL skills (minimum 15-20 if available) - look in skills section, projects, work experience
- ALL projects with technologies and features
- ALL certifications, awards, achievements
- Write 2 sentence descriptions

Return ONLY this JSON (no markdown, no extra text):
{{
  "name": "Full Name",
  "title": "Job Title",
  "location": "City, Country",
  "email": "email",
  "about": "2 sentence summary of expertise and experience",
  "github": "username",
  "linkedin": "username",
  "website": "url",
  "work_experience": [
    {{
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Start - End Date",
      "location": "City, Country",
      "description": "2-3 sentences about responsibilities and impact"
    }}
  ],
  "projects": [{{"title": "name", "description": "2 sentences", "tech": ["tech1"], "features": ["feature1"]}}],
  "skills": [{{"name": "skill", "level": "Beginner|Intermediate|Advanced", "category": "Frontend|Backend|DevOps|Database|Cloud|AI/ML|Other"}}],
  "certifications": [
    {{
      "name": "Certificate Name",
      "issuer": "Issuing Org",
      "year": "YYYY",
      "description": "Brief description"
    }}
  ],
  "achievements": [{{"title": "title", "issuer": "org", "date": "YYYY", "type": "award|internship|other", "description": "1-2 sentences"}}]
}}

Categories: Frontend (React,Vue,JS), Backend (Python,Java,Node), DevOps (Docker,K8s), Database (SQL,Mongo), Cloud (AWS,Azure), AI/ML (TensorFlow,PyTorch), Other
"""


async def parse_resume_with_ai(resume_text: str) -> ResumeExtractedData:
    """
    Parse resume text using OpenRouter LLM and return structured data.
    
    Args:
        resume_text: Raw text extracted from resume file
        
    Returns:
        ResumeExtractedData: Validated and structured resume data
        
    Raises:
        ValueError: If LLM returns invalid JSON or data validation fails
        Exception: If LLM API call fails
    """
    try:
        # Truncate resume text if too long (to avoid token limits)
        max_chars = 8000
        if len(resume_text) > max_chars:
            logger.warning(f"Resume text truncated from {len(resume_text)} to {max_chars} chars")
            resume_text = resume_text[:max_chars]
        
        # Prepare prompt
        prompt = RESUME_PARSING_PROMPT.format(resume_text=resume_text)
        
        # Call LLM with optimized parameters for SPEED
        system_message = "Return ONLY valid JSON. No extra text."
        llm_response = call_llm(
            prompt=prompt,
            max_tokens=2000,  # Reduced for faster response
            temperature=0.1,  # Very low for consistent JSON
            system_message=system_message
        )
        
        if not llm_response:
            raise ValueError("LLM returned empty response")
        
        # Parse JSON response
        parsed_data = parse_json_response(llm_response)
        
        # Validate and convert to Pydantic model
        # This will automatically validate types, enums, and apply field validators
        extracted_data = ResumeExtractedData(**parsed_data)
        
        logger.info(
            f"Successfully parsed resume: {len(extracted_data.projects)} projects, "
            f"{len(extracted_data.skills)} skills, {len(extracted_data.achievements)} achievements"
        )
        
        return extracted_data
        
    except json.JSONDecodeError as e:
        logger.error(f"LLM returned invalid JSON: {str(e)}")
        raise ValueError("AI returned invalid JSON format")
    except Exception as e:
        logger.error(f"Resume parsing failed: {str(e)}", exc_info=True)
        raise


# For backwards compatibility, also export synchronous version
def parse_resume_with_ai_sync(resume_text: str) -> ResumeExtractedData:
    """
    Synchronous version of parse_resume_with_ai.
    
    Note: This is a wrapper that doesn't actually use async,
    since call_llm is synchronous (uses requests library).
    """
    try:
        # Truncate resume text if too long
        max_chars = 8000
        if len(resume_text) > max_chars:
            logger.warning(f"Resume text truncated from {len(resume_text)} to {max_chars} chars")
            resume_text = resume_text[:max_chars]
        
        # Prepare prompt
        prompt = RESUME_PARSING_PROMPT.format(resume_text=resume_text)
        
        # Call LLM
        system_message = "You are a precise resume parser that returns only valid JSON."
        llm_response = call_llm(
            prompt=prompt,
            max_tokens=4000,
            temperature=0.1,
            system_message=system_message
        )
        
        if not llm_response:
            raise ValueError("LLM returned empty response")
        
        # Parse JSON response
        parsed_data = parse_json_response(llm_response)
        
        # Validate and convert to Pydantic model
        extracted_data = ResumeExtractedData(**parsed_data)
        
        logger.info(
            f"Successfully parsed resume: {len(extracted_data.projects)} projects, "
            f"{len(extracted_data.skills)} skills, {len(extracted_data.achievements)} achievements"
        )
        
        return extracted_data
        
    except Exception as e:
        logger.error(f"Resume parsing failed: {str(e)}", exc_info=True)
        raise
