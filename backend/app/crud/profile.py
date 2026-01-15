from sqlalchemy.orm import Session
from app import models, schemas
from app.schemas.profile import ProfileUpdate

def get_profile_by_user(db: Session, user_id: int):
    return db.query(models.Profile).filter(models.Profile.user_id == user_id).first()

def create_or_update_profile(db: Session, user_id: int, profile_data: ProfileUpdate):
    profile = get_profile_by_user(db, user_id)
    
    # Extract User model fields (privacy settings)
    user_fields = {}
    profile_fields = profile_data.dict(exclude_unset=True)
    
    # Separate User model fields from Profile model fields
    for field in ['is_public', 'theme_preference', 'analytics_enabled']:
        if field in profile_fields:
            user_fields[field] = profile_fields.pop(field)
    
    # Update User model fields (single query optimization)
    if user_fields:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if user:
            for key, value in user_fields.items():
                setattr(user, key, value)
    
    # Update or create Profile
    if profile:
        for key, value in profile_fields.items():
            setattr(profile, key, value)
    else:
        profile = models.Profile(user_id=user_id, **profile_fields)
        db.add(profile)
    
    db.commit()
    db.refresh(profile)
    return profile
