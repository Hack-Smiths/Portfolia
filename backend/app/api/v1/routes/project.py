from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.project import ProjectCreate, Project
from app.dependencies.auth_user import get_current_user
from app.models.user import User
from app.utils.database import get_db
from app.crud import project as crud_project

router = APIRouter(prefix="/api/v1/projects", tags=["Projects"])

@router.post("/", response_model=Project)
def create_project(project: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Convert lists to comma-separated strings
    tech_stack_str = ",".join(project.stack)
    features_str = ",".join(project.features)

    new_project = Project(
        user_id=current_user.id,
        title=project.title,
        description=project.description,
        type=project.type,
        tech_stack=tech_stack_str,
        features=features_str,
        stars=project.stars,
        forks=project.forks,
        last_updated=project.last_updated,
        link=project.link
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

