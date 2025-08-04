from sqlalchemy.orm import Session
from app.models.project import Project as ProjectModel
from app.schemas.project import ProjectCreate
from app.models.user import User

def create_project(db: Session, project: ProjectCreate, user: User):
    db_project = ProjectModel(**project.dict(), user_id=user.id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def get_projects_by_user(db: Session, user_id: int):
    return db.query(Project).filter(Project.user_id == user_id).all()
