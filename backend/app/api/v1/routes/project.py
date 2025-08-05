# backend/app/routes/projects.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.project import Project
from app.utils.database import get_db
from app.dependencies.auth_user import get_current_user
from app.models.user import User
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Pydantic schemas
class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    type: Optional[str] = "others"
    stack: Optional[List[str]] = []
    features: Optional[List[str]] = []
    stars: Optional[int] = 0
    forks: Optional[int] = 0
    link: Optional[str] = None
    imported: Optional[bool] = False
    ai_summary: Optional[bool] = False
    saved: Optional[bool] = False

class ProjectOut(ProjectCreate):
    id: int
    class Config:
        orm_mode = True

# Create a new project
@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_project = Project(**project.dict(), owner_id=current_user.id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

# Get all projects for the current user
@router.get("/", response_model=List[ProjectOut])
def get_projects(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Project).filter(Project.owner_id == current_user.id).all()

# Delete a project
@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"detail": "Project deleted"}

# Update a project
@router.put("/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, project_data: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for field, value in project_data.dict().items():
        setattr(project, field, value)
    db.commit()
    db.refresh(project)
    return project
