from fastapi import FastAPI
from app.api.v1.routes import github
from app.api.v1.routes import github, project


app = FastAPI()  

app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])

app.include_router(project.router, prefix="/api/v1/github", tags=["GitHub Summary"]) 