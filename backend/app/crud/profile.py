from sqlalchemy.orm import Session
from app import models, schemas
from app.schemas.profile import ProfileUpdate

def get_profile_by_user(db: Session, user_id: int):
    return db.query(models.Profile).filter(models.Profile.user_id == user_id).first()

def create_or_update_profile(db: Session, user_id: int, profile_data: ProfileUpdate):
    profile = get_profile_by_user(db, user_id)
    if profile:
        for key, value in profile_data.dict(exclude_unset=True).items():
            setattr(profile, key, value)
    else:
        profile = models.Profile(user_id=user_id, **profile_data.dict(exclude_unset=True))
        db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile
