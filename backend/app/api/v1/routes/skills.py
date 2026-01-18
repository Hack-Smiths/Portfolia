from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.utils.database import get_db
from app.dependencies.auth_user import get_current_user

from app.models.skills import Skill as SkillModel
from app.schemas.skills import Skill as SkillSchema
from app.models.user import User  # Import User explicitly
from app.schemas.skills import SkillCreate, SkillUpdate # or from app import schemas
from app.utils.security import validate_csrf

router = APIRouter(
    prefix="/skills",
    tags=["skills"],
    dependencies=[Depends(get_current_user)],
)

@router.post("/", response_model=SkillSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(validate_csrf)])
def create_skill(
    skill_in: SkillCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skill = SkillModel(**skill_in.dict(), user_id=current_user.id)
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

@router.get("/", response_model=List[SkillSchema])
def read_skills(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skills = db.query(SkillModel).filter(SkillModel.user_id == current_user.id).all()
    return skills

@router.put("/{skill_id}", response_model=SkillSchema, dependencies=[Depends(validate_csrf)])
def update_skill(
    skill_id: int,
    skill_in: SkillUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skill = db.query(SkillModel).filter(SkillModel.id == skill_id, SkillModel.user_id == current_user.id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    for key, value in skill_in.dict().items():
        setattr(skill, key, value)
    db.commit()
    db.refresh(skill)
    return skill

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(validate_csrf)])
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skill = db.query(SkillModel).filter(SkillModel.id == skill_id, SkillModel.user_id == current_user.id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return
