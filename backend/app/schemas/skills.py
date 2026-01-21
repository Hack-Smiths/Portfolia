from pydantic import BaseModel, validator
from app.utils.security import sanitize_html

class SkillBase(BaseModel):
    name: str
    category: str
    level: str
    experience: str

    @validator('name', 'category', 'level', 'experience')
    def sanitize_fields(cls, v):
        return sanitize_html(v)

class SkillCreate(SkillBase):
    pass

class SkillUpdate(SkillBase):
    pass

class Skill(SkillBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
