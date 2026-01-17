from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas
from app.dependencies.auth_user import get_db, get_current_user
from app.models.profile import Profile
from app.models.project import Project
from app.models.skills import Skill
from app.models.certificates import Certificate
from app.models.work_experience import WorkExperience
from app.models.awards import Award

router = APIRouter()


@router.get("/portfolio/preview")
def get_portfolio_preview(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user.id

    # Fetch raw data
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    projects = db.query(Project).filter(Project.owner_id == user_id).all()
    skills = db.query(Skill).filter(Skill.user_id == user_id).all()
    certificates = db.query(Certificate).filter(Certificate.user_id == user_id).all()
    work_experience = db.query(WorkExperience).filter(WorkExperience.user_id == user_id).all()
    awards = db.query(Award).filter(Award.user_id == user_id).all()

    # Build final frontend-friendly object
    portfolio_data = {
        "name": profile.name if profile and profile.name else current_user.username.capitalize(),
        "title": profile.title if profile else "Full-Stack Developer & AI Enthusiast",
        "tagline": "Building the future with code, one project at a time",
        "location": profile.location if profile else "Sample, India",
        "email": profile.email if profile else current_user.email,
        "github": profile.github if profile else f"{current_user.username}-dev",
        "linkedin": profile.linkedin if profile else f"{current_user.username}-dev",
        "avatar": profile.avatar if profile else "",
        "about": profile.bio if profile else "Aspiring full-stack developer with a passion for AI and machine learning.",
        "theme_preference": current_user.theme_preference or "classic",

        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description or "",
                "image": p.link or "https://via.placeholder.com/400x250",  # Could be screenshot URL
                "tech": p.stack if isinstance(p.stack, list) else (p.stack.split(",") if p.stack else []),
                "features": p.features.split(",") if isinstance(p.features, str) else (p.features or []),
                "stars": p.stars or 0,
                "forks": p.forks or 0,
                "demo": p.link,
                "repo": p.link,  # Or separate repo field if available
                "featured": False
            }
            for p in projects
        ],

        "achievements": [
            {
                "title": w.title,
                "issuer": w.organization,
                "date": w.duration,
                "type": w.status or "internship",
                "description": w.description or ""
            }
            for w in work_experience
        ] + [
            {
                "title": a.title,
                "issuer": a.organization,
                "date": a.year,
                "type": a.category or "award",
                "description": a.description or ""
            }
            for a in awards
        ],

        "certificates": [
            {
                "title": c.title,
                "issuer": c.description or "Unknown",
                "date": c.year,
                "credentialId": c.credential_id
            }
            for c in certificates
        ],

        "skills": [
            {
                "name": s.name,
                "level": s.level,
                "category": s.category
            }
            for s in skills
        ]
    }

    return portfolio_data
