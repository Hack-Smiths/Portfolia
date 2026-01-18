from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.schemas import certificates, awards, work_experience
from app.dependencies.auth_user import get_db, get_current_user
from app.utils.security import validate_csrf

router = APIRouter(prefix="/achievements", tags=["Achievements"])

# ---------- WORK EXPERIENCE ----------
@router.post("/work-experience", response_model=work_experience.WorkExperienceOut, dependencies=[Depends(validate_csrf)])
def create_work_experience(
    data: work_experience.WorkExperienceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_exp = models.WorkExperience(user_id=current_user.id, **data.dict())
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp

@router.get("/work-experience", response_model=List[work_experience.WorkExperienceOut])
def get_work_experiences(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.WorkExperience).filter(models.WorkExperience.user_id == current_user.id).all()

@router.put("/work-experience/{id}", response_model=work_experience.WorkExperienceOut, dependencies=[Depends(validate_csrf)])
def update_work_experience(
    id: int,
    data: work_experience.WorkExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    exp = db.query(models.WorkExperience).filter(
        models.WorkExperience.id == id,
        models.WorkExperience.user_id == current_user.id
    ).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Work experience not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(exp, key, value)
    db.commit()
    db.refresh(exp)
    return exp

@router.delete("/work-experience/{id}", dependencies=[Depends(validate_csrf)])
def delete_work_experience(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    exp = db.query(models.WorkExperience).filter(
        models.WorkExperience.id == id,
        models.WorkExperience.user_id == current_user.id
    ).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Work experience not found")
    db.delete(exp)
    db.commit()
    return {"message": "Deleted successfully"}


# ---------- CERTIFICATES ----------
@router.post("/certificates", response_model=certificates.CertificateOut, dependencies=[Depends(validate_csrf)])
def create_certificate(
    data: certificates.CertificateCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_cert = models.Certificate(user_id=current_user.id, **data.dict())
    db.add(new_cert)
    db.commit()
    db.refresh(new_cert)
    return new_cert

@router.get("/certificates", response_model=List[certificates.CertificateOut])
def get_certificates(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Certificate).filter(models.Certificate.user_id == current_user.id).all()

@router.put("/certificates/{id}", response_model=certificates.CertificateOut, dependencies=[Depends(validate_csrf)])
def update_certificate(
    id: int,
    data: certificates.CertificateUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    cert = db.query(models.Certificate).filter(
        models.Certificate.id == id,
        models.Certificate.user_id == current_user.id
    ).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(cert, key, value)
    db.commit()
    db.refresh(cert)
    return cert

@router.delete("/certificates/{id}", dependencies=[Depends(validate_csrf)])
def delete_certificate(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    cert = db.query(models.Certificate).filter(
        models.Certificate.id == id,
        models.Certificate.user_id == current_user.id
    ).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    db.delete(cert)
    db.commit()
    return {"message": "Deleted successfully"}


# ---------- AWARDS ----------
@router.post("/awards", response_model=awards.AwardOut, dependencies=[Depends(validate_csrf)])
def create_award(
    data: awards.AwardCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_award = models.Award(user_id=current_user.id, **data.dict())
    db.add(new_award)
    db.commit()
    db.refresh(new_award)
    return new_award

@router.get("/awards", response_model=List[awards.AwardOut])
def get_awards(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Award).filter(models.Award.user_id == current_user.id).all()

@router.put("/awards/{id}", response_model=awards.AwardOut, dependencies=[Depends(validate_csrf)])
def update_award(
    id: int,
    data: awards.AwardUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    award = db.query(models.Award).filter(
        models.Award.id == id,
        models.Award.user_id == current_user.id
    ).first()
    if not award:
        raise HTTPException(status_code=404, detail="Award not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(award, key, value)
    db.commit()
    db.refresh(award)
    return award

@router.delete("/awards/{id}", dependencies=[Depends(validate_csrf)])
def delete_award(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    award = db.query(models.Award).filter(
        models.Award.id == id,
        models.Award.user_id == current_user.id
    ).first()
    if not award:
        raise HTTPException(status_code=404, detail="Award not found")
    db.delete(award)
    db.commit()
    return {"message": "Deleted successfully"}
