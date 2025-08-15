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
    pass

class ProfileOut(ProfileBase):
    id: int
    class Config:
        orm_mode = True
