from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    type: str
    stack: List[str]
    features: List[str]
    stars: Optional[int] = 0
    forks: Optional[int] = 0
    link: Optional[str] = ""
    imported: Optional[bool] = False
    ai_summary: Optional[bool] = False
    saved: Optional[bool] = False

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    last_updated: datetime
    owner_id: int

    class Config:
        orm_mode = True
