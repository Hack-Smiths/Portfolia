import requests
from fastapi import APIRouter, Query
from urllib.parse import urlparse

router = APIRouter()


headers = {
    "Authorization": f"Bearer {GITHUB_API_TOKEN}",
    "Accept": "application/vnd.github+json"
}

@router.get("/repo-info")
def get_repo_info(repo_url: str = Query(...)):
    try:
        path = urlparse(repo_url).path.strip("/")
        owner, repo = path.split("/")[:2]

        # Basic repo info
        repo_resp = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}",
            headers=headers
        )
        repo_data = repo_resp.json()

        # README (optional)
        readme_resp = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}/readme",
            headers=headers
        )
        readme = readme_resp.json()
        readme_content = readme.get("content")

        return {
            "name": repo_data.get("name"),
            "owner": repo_data.get("owner", {}).get("login"),
            "stars": repo_data.get("stargazers_count"),
            "forks": repo_data.get("forks_count"),
            "description": repo_data.get("description"),
            "html_url": repo_data.get("html_url"),
            "readme_content_base64": readme_content
        }

    except Exception as e:
        return {"error": str(e)}
