

from fastapi import FastAPI
from app.api.v1.routes import summary, user
from app.api.v1.routes import auth, project
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.models.project import Project  # This ensures both classes are registered


app = FastAPI()

# Optional CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summary.router, tags=["GitHub Summary"])
# app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
app.include_router(auth.router, tags=['Auth'])
app.include_router(user.router, tags=['Auth'])
# app.include_router(project.router, tags=['Project'])
