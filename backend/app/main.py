from fastapi import FastAPI
from app.api.v1.routes import github  

app = FastAPI()  

app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
