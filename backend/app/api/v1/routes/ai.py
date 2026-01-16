"""
AI-related endpoints (e.g., project description enhancement).
Step 1: router wiring + health check only.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/ping")
async def ping():
    """Health check endpoint to verify AI router is wired correctly."""
    return {"status": "ok", "message": "AI router is wired correctly"}
