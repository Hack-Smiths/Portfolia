from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas
from app.crud import profile as crud_profile
from app.dependencies.auth_user import get_db
from app.schemas.profile import ProfileUpdate, ProfileOut
from app.dependencies.auth_user import get_current_user
from app.utils.security import validate_csrf

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/", response_model=ProfileOut)
def get_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    profile = crud_profile.get_profile_by_user(db, current_user.id)
    if not profile:
        return {}
    return profile

@router.post("/", response_model=ProfileOut, dependencies=[Depends(validate_csrf)])
def save_profile(
    profile_data: schemas.profile.ProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return crud_profile.create_or_update_profile(db, current_user.id, profile_data)
