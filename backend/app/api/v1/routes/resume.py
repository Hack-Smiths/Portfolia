# app/api/v1/routes/resume.py
"""
Resume upload and AI extraction API endpoints.
Handles PDF/DOCX upload, text extraction, AI parsing, and review-before-save workflow.
"""
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies.auth_user import get_current_user, get_db
from app.models.user import User
from app.models.resume import Resume
from app.models.profile import Profile
from app.models.project import Project
from app.models.skills import Skill
from app.models.skills import Skill
from app.models.awards import Award
from app.models.work_experience import WorkExperience
from app.models.certificates import Certificate
from app.schemas.resume import (
    ResumeUploadResponse,
    ResumeConfirmRequest,
    ResumeExtractedData,
    ResumeOut
)
from app.utils.resume_extractor import extract_text
from app.utils.resume_parser import parse_resume_with_ai_sync
import os
import logging
from io import BytesIO
from datetime import datetime

router = APIRouter(prefix="/api/v1/resumes", tags=["Resumes"])
logger = logging.getLogger(__name__)

# File upload constraints
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {".pdf", ".docx"}


@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    file: UploadFile = File(...)
):
    """
    Upload and parse resume file (PDF or DOCX).
    
    - Validates file type and size
    - Extracts text from file
    - Uses AI to parse structured data
    - Saves to database with is_saved=False for review
    - Replaces any existing unsaved resume for the user
    
    Returns extracted data for frontend review.
    """
    
    # Debug logging
    logger.info(f"Received file upload request from user {current_user.id}")
    logger.info(f"File object: {file}")
    logger.info(f"Filename: {file.filename if file else 'None'}")
    
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No file provided. Please upload a PDF or DOCX file."
        )
    
    # Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File type '{file_ext}' not supported. Please upload PDF or DOCX files only."
        )
    
    # Read file content
    try:
        file_bytes = await file.read()
    except Exception as e:
        logger.error(f"Failed to read uploaded file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Failed to read uploaded file"
        )
    
    # Validate file size
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"File size ({len(file_bytes)} bytes) exceeds 5MB limit"
        )
    
    # Extract text from file
    logger.info(f"Extracting text from {file_ext} file: {file.filename}")
    resume_text = extract_text(BytesIO(file_bytes), file_ext)
    
    if not resume_text:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Failed to extract text from file. Please ensure the file is not corrupted or password-protected."
        )
    
    logger.info(f"Extracted {len(resume_text)} characters from resume")
    
    # Parse resume with AI (using OpenRouter)
    try:
        logger.info("Parsing resume with OpenRouter AI...")
        extracted_data = parse_resume_with_ai_sync(resume_text)
    except ValueError as e:
        # Validation or JSON parsing error
        logger.error(f"Resume parsing validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Resume parsing failed: {str(e)}"
        )
    except Exception as e:
        # OpenRouter API or other errors
        logger.error(f"Resume parsing error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Resume parsing failed. Please try again or contact support."
        )
    
    # Delete any existing unsaved resume for this user
    db.query(Resume).filter(
        Resume.owner_id == current_user.id,
        Resume.is_saved == False
    ).delete()
    db.commit()
    
    # Save new resume draft
    resume_record = Resume(
        owner_id=current_user.id,
        filename=file.filename,
        file_type=file_ext.replace('.', ''),
        extracted_text=resume_text,
        parsed_data=extracted_data.model_dump(),  # Pydantic v2
        is_saved=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(resume_record)
    db.commit()
    db.refresh(resume_record)
    
    logger.info(f"Resume saved with ID {resume_record.id} for user {current_user.id}")
    
    return ResumeUploadResponse(
        resume_id=resume_record.id,
        extracted_data=extracted_data,
        message="Resume parsed successfully. Please review the extracted data and confirm to save to your portfolio."
    )


@router.get("/draft", response_model=ResumeExtractedData)
async def get_draft(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the current unsaved resume draft for review.
    
    Returns the extracted data from the most recent unsaved resume.
    """
    draft = db.query(Resume).filter(
        Resume.owner_id == current_user.id,
        Resume.is_saved == False
    ).order_by(Resume.created_at.desc()).first()
    
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No draft resume found. Please upload a resume first."
        )
    
    # Convert parsed_data dict to Pydantic model
    try:
        extracted_data = ResumeExtractedData(**draft.parsed_data)
    except Exception as e:
        logger.error(f"Failed to parse draft data: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to load draft data"
        )
    
    return extracted_data


@router.post("/confirm")
async def confirm_resume(
    request: ResumeConfirmRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Confirm and save resume data to user's portfolio.
    
    - Validates the resume draft exists and belongs to the user
    - Merges approved data into profile, projects, skills, and achievements
    - Marks the resume as saved (is_saved=True)
    
    This implements the review-before-save workflow.
    """
    
    # Get the draft resume
    draft = db.query(Resume).filter(
        Resume.id == request.resume_id,
        Resume.owner_id == current_user.id,
        Resume.is_saved == False
    ).first()
    
    if not draft:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Draft resume not found or already saved"
        )
    
    approved_data = request.approved_data
    
    # TODO: Implement comprehensive merge logic
    # For now, we'll implement basic profile update and creation of new records
    
    try:
        # 1. Update or create profile
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        
        if profile:
            # Update existing profile with non-empty values
            if approved_data.name:
                profile.name = approved_data.name
            if approved_data.email:
                profile.email = approved_data.email
            if approved_data.title:
                profile.title = approved_data.title
            if approved_data.location:
                profile.location = approved_data.location
            if approved_data.about:
                profile.bio = approved_data.about
            if approved_data.github:
                profile.github = approved_data.github
            if approved_data.linkedin:
                profile.linkedin = approved_data.linkedin
            if approved_data.website:
                profile.website = approved_data.website
        else:
            # Create new profile
            profile = Profile(
                user_id=current_user.id,
                name=approved_data.name or current_user.full_name,
                email=approved_data.email or current_user.email,
                title=approved_data.title,
                location=approved_data.location,
                bio=approved_data.about,
                github=approved_data.github,
                linkedin=approved_data.linkedin,
                website=approved_data.website
            )
            db.add(profile)
        
        # 2. Add projects (only new ones, avoid duplicates)
        for project_data in approved_data.projects:
            # Check if project with same title already exists
            existing = db.query(Project).filter(
                Project.owner_id == current_user.id,
                Project.title == project_data.title
            ).first()
            
            if not existing:
                project = Project(
                    owner_id=current_user.id,
                    title=project_data.title,
                    description=project_data.description,
                    type="resume",  # Mark as imported from resume
                    stack=project_data.tech,
                    features=project_data.features,
                    stars=0,
                    forks=0,
                    link="",
                    imported=True,
                    ai_summary=True,
                    saved=True,
                    last_updated=datetime.utcnow()
                )
                db.add(project)
        
        # 3. Add skills (avoid duplicates)
        for skill_data in approved_data.skills:
            existing = db.query(Skill).filter(
                Skill.user_id == current_user.id,
                Skill.name == skill_data.name
            ).first()
            
            if not existing:
                skill = Skill(
                    user_id=current_user.id,
                    name=skill_data.name,
                    category=skill_data.category.value,
                    level=skill_data.level.value,
                    experience=""  # TODO: Could be inferred from resume
                )
                db.add(skill)
        
        # 4a. Add Work Experience
        for work_data in approved_data.work_experience:
            existing = db.query(WorkExperience).filter(
                WorkExperience.user_id == current_user.id,
                WorkExperience.title == work_data.title,
                WorkExperience.organization == work_data.company
            ).first()
            
            if not existing:
                work = WorkExperience(
                    user_id=current_user.id,
                    title=work_data.title,
                    organization=work_data.company,
                    duration=work_data.duration,
                    location=work_data.location,
                    description=work_data.description
                )
                db.add(work)

        # 4b. Add Certificates
        for cert_data in approved_data.certifications:
            existing = db.query(Certificate).filter(
                Certificate.user_id == current_user.id,
                Certificate.title == cert_data.name
            ).first()
            
            if not existing:
                cert = Certificate(
                    user_id=current_user.id,
                    title=cert_data.name,
                    issuer=cert_data.issuer,
                    year=cert_data.year,
                    description=cert_data.description,
                    credential_id="" # Resume might not have this
                )
                db.add(cert)
        
        # 4. Add achievements (avoid duplicates)
        for achievement_data in approved_data.achievements:
            existing = db.query(Award).filter(
                Award.user_id == current_user.id,
                Award.title == achievement_data.title
            ).first()
            
            if not existing:
                award = Award(
                    user_id=current_user.id,
                    title=achievement_data.title,
                    organization=achievement_data.issuer,
                    year=achievement_data.date,
                    description=achievement_data.description,
                    category=achievement_data.type
                )
                db.add(award)
        
        # 5. Mark resume as saved
        draft.is_saved = True
        draft.updated_at = datetime.utcnow()
        
        # Commit all changes
        db.commit()
        
        logger.info(f"Successfully saved resume data for user {current_user.id}")
        
        return {
            "message": "Resume data saved successfully to your portfolio",
            "profile_updated": True,
            "work_experience_added": len(approved_data.work_experience),
            "projects_added": len(approved_data.projects),
            "skills_added": len(approved_data.skills),
            "certifications_added": len(approved_data.certifications),
            "achievements_added": len(approved_data.achievements)
        }
        
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to save resume data: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save resume data: {str(e)}"
        )


@router.get("/history", response_model=list[ResumeOut])
async def get_resume_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all resume upload history for the current user.
    
    Returns both saved and unsaved resumes, ordered by most recent first.
    """
    resumes = db.query(Resume).filter(
        Resume.owner_id == current_user.id
    ).order_by(Resume.created_at.desc()).all()
    
    return resumes


@router.delete("/{resume_id}")
async def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a resume record.
    
    Only allows deleting unsaved drafts or the user's own resumes.
    """
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.owner_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    db.delete(resume)
    db.commit()
    
    return {"message": "Resume deleted successfully"}
