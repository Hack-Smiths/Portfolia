from fastapi import APIRouter, Query
from urllib.parse import urlparse
import requests, os, base64
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

GITHUB_API_TOKEN = os.getenv("GITHUB_API_TOKEN")

headers = {
    "Authorization": f"Bearer {GITHUB_API_TOKEN}",
    "Accept": "application/vnd.github+json"
}

@router.get("/repo-info")
def get_repo_info(repo_url: str = Query(..., description="Full GitHub repo URL")):
    try:
        parsed = urlparse(repo_url)
        path = parsed.path.strip("/")
        owner, repo = path.replace(".git", "").split("/")[:2]

        repo_resp = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}",
            headers=headers
        )
        repo_data = repo_resp.json()

        readme_resp = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}/readme",
            headers=headers
        )
        readme_data = readme_resp.json()

        readme_content_base64 = readme_data.get("content")
        readme_decoded = None

        if readme_content_base64:
            readme_decoded = base64.b64decode(readme_content_base64).decode("utf-8")

        return {
            "name": repo_data.get("name"),
            "owner": repo_data.get("owner", {}).get("login"),
            "stars": repo_data.get("stargazers_count"),
            "forks": repo_data.get("forks_count"),
            "description": repo_data.get("description"),
            "html_url": repo_data.get("html_url"),
            "readme": readme_decoded
        }

    except Exception as e:
        return {"error": str(e)}


