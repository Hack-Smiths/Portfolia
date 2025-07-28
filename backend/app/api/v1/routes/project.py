from fastapi import APIRouter, Query
from urllib.parse import urlparse
import requests
import openai
import base64
import os
from dotenv import load_dotenv
import json

load_dotenv()

router = APIRouter()

@router.get("/smart-summary")
def smart_summary(repo_url: str = Query(..., description="GitHub repo URL")):
    try:
        # Load API keys from .env
        github_token = os.getenv("GITHUB_TOKEN")
        openai.api_key = os.getenv("OPENAI_API_KEY")

        headers = {
            "Authorization": f"token {github_token}",
            "Accept": "application/vnd.github.v3+json"
        }

        # Parse GitHub URL
        parsed = urlparse(repo_url)
        path = parsed.path.strip("/")
        owner, repo = path.replace(".git", "").split("/")[:2]

        # === Get repo metadata ===
        repo_resp = requests.get(f"https://api.github.com/repos/{owner}/{repo}", headers=headers)
        repo_data = repo_resp.json()

        # === Get README content ===
        readme_resp = requests.get(f"https://api.github.com/repos/{owner}/{repo}/readme", headers=headers)
        readme_data = readme_resp.json()
        content_base64 = readme_data.get("content")

        if not content_base64:
            return {"error": "README not found in the repo."}

        readme = base64.b64decode(content_base64).decode("utf-8")

        # === Build Prompt for OpenAI ===
        prompt = f"""
From the following GitHub README, extract and return a JSON object with the following keys only:

- title: project name
- description: 1–2 line description
- tech_stack: list of technologies
- deployed_link: deployment URL if any (else null)
- features: list of main features (optional)

README:
{readme}

Respond ONLY in valid JSON.
"""

        # === Call OpenAI ===
        llm_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        # === Extract and parse the JSON from LLM ===
        llm_text = llm_response['choices'][0]['message']['content']

        try:
            summary = json.loads(llm_text)
        except json.JSONDecodeError:
            return {
                "error": "LLM response is not valid JSON. Try improving prompt or check README format.",
                "raw_output": llm_text
            }

        # === Final JSON Response ===
        return {
            "name": repo_data.get("name"),
            "owner": repo_data.get("owner", {}).get("login"),
            "stars": repo_data.get("stargazers_count"),
            "forks": repo_data.get("forks_count"),
            "repo_url": repo_data.get("html_url"),
            "summary": summary
        }

    except Exception as e:
        return {"error": str(e)}
