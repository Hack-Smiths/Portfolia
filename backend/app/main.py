

from fastapi import FastAPI
from app.api.v1.routes import summary, user, auth, project, achievements, skills, profile
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.models.project import Project  # This ensures both classes are registered


app = FastAPI()

origins = [
    "https://portfolia-ai.vercel.app",  # your deployed frontend
    "http://localhost:8080",         # optional, for local testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(summary.router, tags=["GitHub Summary"])
# app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
app.include_router(auth.router, tags=['Auth'])
app.include_router(user.router, tags=['Auth'])
app.include_router(project.router, prefix="/projects", tags=["Projects"])
app.include_router(achievements.router)
app.include_router(skills.router)
app.include_router(profile.router)