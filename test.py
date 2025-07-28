from urllib.parse import urlparse
parsed = urlparse("https://github.com/Tech-Smiths/Voix-It")
path = parsed.path.strip("/")
owner, repo = path.replace(".git", "").split("/")[:2]
print(parsed)
print(path)
print(owner)
print(repo)