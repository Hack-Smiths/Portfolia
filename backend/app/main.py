from fastapi import FastAPI
from app.api.v1.routes import github  # import your routers properly

app = FastAPI()  # THIS LINE IS MISSING in your error

# Register routes
app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
