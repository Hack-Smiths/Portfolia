# Portfolia\backend\app\api\v1\routes\portfolio_public.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.auth_user import get_db
from app.models.user import User  # assuming you have a User model
from app.models.profile import Profile
from app.models.project import Project
from app.models.skills import Skill
from app.models.certificates import Certificate
from app.models.work_experience import WorkExperience
from app.models.awards import Award

router = APIRouter()

RESERVED_USERNAMES = {"dashboard", "auth", "projects", "portfolio", "api", "landing", "profile"}

@router.get("/portfolio/public/{username}")
def get_public_portfolio(username: str, db: Session = Depends(get_db)):
    # Check reserved words
    if username.lower() in RESERVED_USERNAMES:
        raise HTTPException(status_code=400, detail="Invalid username")

    # Find user by username
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_id = user.id

    # Fetch raw data
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    projects = db.query(Project).filter(Project.owner_id == user_id).all()
    skills = db.query(Skill).filter(Skill.user_id == user_id).all()
    certificates = db.query(Certificate).filter(Certificate.user_id == user_id).all()
    work_experience = db.query(WorkExperience).filter(WorkExperience.user_id == user_id).all()
    awards = db.query(Award).filter(Award.user_id == user_id).all()

    # Build frontend-friendly object
    portfolio_data = {
        "name": profile.name if profile and profile.name else user.username.capitalize(),
        "title": profile.title if profile else "Full-Stack Developer & AI Enthusiast",
        "tagline": "Building the future with code, one project at a time",
        "location": profile.location if profile else "Sample, India",
        "github": profile.github if profile else f"{user.username}-dev",
        "linkedin": profile.linkedin if profile else f"{user.username}-dev",
        "about": profile.bio if profile else "Aspiring full-stack developer with a passion for AI and machine learning.",

        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description or "",
                "image": p.link or "https://via.placeholder.com/400x250",
                "tech": p.stack if isinstance(p.stack, list) else (p.stack.split(",") if p.stack else []),
                "features": p.features.split(",") if isinstance(p.features, str) else (p.features or []),
                "stars": p.stars or 0,
                "forks": p.forks or 0,
                "demo": p.link,
                "repo": p.link,
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
