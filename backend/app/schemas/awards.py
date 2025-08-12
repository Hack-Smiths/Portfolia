from pydantic import BaseModel
from typing import Optional

class AwardBase(BaseModel):
    title: str
    organization: Optional[str] = None
    year: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None

class AwardCreate(AwardBase):
    pass

class AwardUpdate(AwardBase):
    pass

class AwardOut(AwardBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
