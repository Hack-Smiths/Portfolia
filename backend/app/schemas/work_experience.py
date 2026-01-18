from pydantic import BaseModel, validator
from typing import Optional, List
from app.utils.security import sanitize_html

class WorkExperienceBase(BaseModel):
    title: str
    organization: str
    duration: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    skills: Optional[List[str]] = None
    status: Optional[str] = None

    @validator('title', 'organization', 'duration', 'location', 'description', 'status')
    def sanitize_strings(cls, v):
        return sanitize_html(v)

    @validator('skills')
    def sanitize_lists(cls, v):
        if v:
            return [sanitize_html(item) for item in v]
        return v

class WorkExperienceCreate(WorkExperienceBase):
    pass

class WorkExperienceUpdate(WorkExperienceBase):
    pass

class WorkExperienceOut(WorkExperienceBase):
    id: int
    user_id: int  # Matches Projects style
    class Config:
        orm_mode = True
