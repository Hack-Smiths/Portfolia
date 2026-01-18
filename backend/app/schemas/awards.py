from pydantic import BaseModel, validator
from typing import Optional
from app.utils.security import sanitize_html

class AwardBase(BaseModel):
    title: str
    organization: Optional[str] = None
    year: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None

    @validator('title', 'organization', 'year', 'description', 'category')
    def sanitize_fields(cls, v):
        return sanitize_html(v)

class AwardCreate(AwardBase):
    pass

class AwardUpdate(AwardBase):
    pass

class AwardOut(AwardBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
