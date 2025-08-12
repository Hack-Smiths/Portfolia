from pydantic import BaseModel
from typing import Optional, List

class WorkExperienceBase(BaseModel):
    title: str
    organization: str
    duration: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    skills: Optional[List[str]] = None
    status: Optional[str] = None

class WorkExperienceCreate(WorkExperienceBase):
    pass

class WorkExperienceUpdate(WorkExperienceBase):
    pass

class WorkExperienceOut(WorkExperienceBase):
    id: int
    user_id: int  # Matches Projects style
    class Config:
        orm_mode = True
