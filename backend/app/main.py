

from fastapi import FastAPI
from app.api.v1.routes import summary, user, auth, project, achievements, skills, profile, preview, portfolio, cron, resume
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.models.project import Project  # This ensures both classes are registered


app = FastAPI()

origins = [
    "https://portfolia-ai.vercel.app",  # your deployed frontend
    "http://localhost:8080",             # local frontend (localhost)
    "http://127.0.0.1:8080",            # local frontend (127.0.0.1)
    "http://localhost:5173",            # vite default port
    "http://127.0.0.1:5173",            # vite default port (127.0.0.1)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(cron.router)
app.include_router(summary.router, tags=["GitHub Summary"])

# app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
app.include_router(auth.router, tags=['Auth'])
app.include_router(user.router, tags=['Auth'])
app.include_router(project.router, prefix="/projects", tags=["Projects"])
app.include_router(achievements.router)
app.include_router(skills.router)
app.include_router(profile.router)
app.include_router(preview.router)
app.include_router(portfolio.router)
app.include_router(resume.router, tags=["Resumes"])
# Trigger reload