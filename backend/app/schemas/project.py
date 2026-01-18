from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime
from app.utils.security import sanitize_html

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

    @validator('title', 'description', 'type', 'link')
    def sanitize_strings(cls, v):
        return sanitize_html(v)

    @validator('stack', 'features')
    def sanitize_lists(cls, v):
        if v:
            return [sanitize_html(item) for item in v]
        return v

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
