from pydantic import BaseModel

class SkillBase(BaseModel):
    name: str
    category: str
    level: str
    experience: str

class SkillCreate(SkillBase):
    pass

class SkillUpdate(SkillBase):
    pass

class Skill(SkillBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
