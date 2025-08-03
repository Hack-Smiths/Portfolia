

from fastapi import FastAPI
from app.api.v1.routes import project, github, user
from app.api.v1.routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Optional CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project.router, tags=["GitHub Summary"])
# app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
app.include_router(auth.router, tags=['Auth'])
app.include_router(user.router, tags=['Auth'])