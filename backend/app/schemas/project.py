from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = ""
    type: Optional[str] = "others"
    stack: List[str]
    features: List[str]
    stars: Optional[int] = 0
    forks: Optional[int] = 0
    last_updated: Optional[datetime] = None
    link: Optional[str] = ""

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
