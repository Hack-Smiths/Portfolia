from urllib.parse import urlparse

def parse_github_url(repo_url: str):
    try:
        parsed = urlparse(repo_url)
        path = parsed.path.strip("/")
        parts = path.replace(".git", "").split("/")

        owner = parts[0] if len(parts) > 0 else None
        repo = parts[1] if len(parts) > 1 else None

        return {
            "original_url": repo_url,
            "parsed_path": parsed.path,
            "owner": owner,
            "repo": repo
        }

    except Exception as e:
        return {"error": str(e)}

# 🔍 Sample GitHub URLs to test
sample_urls = [
    "https://github.com/Darkknight1213/Portfolio.git",
    "https://github.com/YBIFoundation/Internship",
    "https://github.com/openai/gpt-4",
    "https://github.com/useronly"
]

for url in sample_urls:
    print(parse_github_url(url))
    print("-" * 50)
