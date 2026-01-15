from pydantic import BaseModel, HttpUrl, EmailStr
from typing import Optional

class ProfileBase(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    title: Optional[str]
    location: Optional[str]
    bio: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    website: Optional[str]
    avatar: Optional[str]

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    # Privacy and preference settings (stored on User model)
    is_public: Optional[bool] = None
    theme_preference: Optional[str] = None
    analytics_enabled: Optional[bool] = None

class ProfileOut(ProfileBase):
    id: int
    class Config:
        orm_mode = True
