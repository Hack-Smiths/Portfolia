from fastapi import Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.dependencies.auth_user import get_current_user

router = APIRouter()

@router.get("/me")
def get_current_user_details(current_user: User = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "email": current_user.email,
        "id": current_user.id
    }
