import os
import requests
from fastapi import APIRouter, Query
from dotenv import load_dotenv
import json

load_dotenv()

router = APIRouter()

API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL", "mistralai/mistral-7b-instruct:free")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@router.get("/smart-summary")
def github_summary(repo_url: str = Query(..., description="GitHub repo URL")):
    try:
        if "github.com" not in repo_url:
            return {"error": "Invalid GitHub URL"}

        parts = repo_url.strip('/').split('/')
        owner, repo = parts[-2], parts[-1]
        raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/main/README.md"
        resp = requests.get(raw_url)
        if resp.status_code != 200:
            return {"error": "README.md not found at raw.githubusercontent.com"}

        readme = resp.text[:1800].replace("\n", " ")

        prompt = f"""
Extract this JSON from the following README — no additional text:

{{
  "title": "",
  "description": "",
  "tech stack": "",
  "deployed link": "",
  "features": []
}}

README:
{readme}
"""

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://openrouter.ai"
        }

        payload = {
            "model": MODEL,
            "messages": [{"role": "system", "content": "You are an assistant."}, {"role": "user", "content": prompt}],
            "max_tokens": 600,
            "temperature": 0.2
        }

        r = requests.post(OPENROUTER_URL, json=payload, headers=headers)
        if r.status_code != 200:
            return {"error": f"OpenRouter error: {r.text}"}

        content = r.json()["choices"][0]["message"]["content"].strip()

        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {"error": "LLM output not JSON", "raw": content}

    except Exception as e:
        return {"error": str(e)}
