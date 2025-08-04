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

        # Extract GitHub owner/repo
        parts = repo_url.strip('/').split('/')
        if len(parts) < 2:
            return {"error": "Could not parse GitHub repo URL"}
        owner, repo = parts[-2], parts[-1]

        # Construct raw README URL
        raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/main/README.md"
        resp = requests.get(raw_url)
        if resp.status_code != 200:
            return {"error": f"README.md not found at {raw_url}"}
        repo_resp = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}",
            headers=headers
        )
        repo_data = repo_resp.json()
        readme = resp.text[:2000].replace("\n", " ").strip()

        # Define prompt
        prompt = f"""
Extract the following JSON from the README below. Be concise and accurate. If any field is missing, infer it cautiously if possible, otherwise leave it empty or null. Use bullet points for features.

{{
  "title": "",
  "description": "",
  "tech stack": "", 
  "deployed link": "",
  "features": []
}}

README:
{readme, repo_data}
"""


        # Prepare request to OpenRouter
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://openrouter.ai"
        }

        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": "You are a helpful assistant that extracts structured data from project READMEs."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 500,
            "temperature": 0.2
        }

        response = requests.post(OPENROUTER_URL, json=payload, headers=headers)

        if response.status_code != 200:
            return {"error": f"OpenRouter error: {response.text}"}

        content = response.json()["choices"][0]["message"]["content"].strip()

        try:
            data = json.loads(content)

            # Normalize structure (optional enhancement)
            data["tech_stack"] = data.get("tech_stack", "").strip()
            data["features"] = data.get("features", [])
            data["title"] = data.get("title", "").strip()
            data["description"] = data.get("description", "").strip()
            data["deployed_link"] = data.get("deployed_link", "").strip()

            return data

        except json.JSONDecodeError:
            return {"error": "LLM output not in valid JSON", "raw": content}

    except Exception as e:
        return {"error": str(e)}
