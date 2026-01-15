from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/cron", tags=["Cron"])

@router.get("/ping")
async def cron_ping():
    return {
        "status": "ok",
        "ran_at": datetime.utcnow().isoformat()
    }
