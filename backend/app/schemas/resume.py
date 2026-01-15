# app/schemas/resume.py
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from enum import Enum
from datetime import datetime


class SkillLevel(str, Enum):
    """Skill proficiency levels matching frontend expectations."""
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"


class SkillCategory(str, Enum):
    """Skill categories matching existing portfolio schema."""
    FRONTEND = "Frontend"
    BACKEND = "Backend"
    DEVOPS = "DevOps"
    DATABASE = "Database"
    CLOUD = "Cloud"
    AI_ML = "AI/ML"
    OTHER = "Other"


class ProjectExtracted(BaseModel):
    """Extracted project data from resume."""
    title: str
    description: str
    tech: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    
    @field_validator('tech', 'features', mode='before')
    @classmethod
    def ensure_list(cls, v):
        """Ensure tech and features are always lists, not strings."""
        if isinstance(v, str):
            return [v] if v else []
        return v or []


class SkillExtracted(BaseModel):
    """Extracted skill data from resume."""
    name: str
    level: SkillLevel = SkillLevel.INTERMEDIATE
    category: SkillCategory = SkillCategory.OTHER
    
    @field_validator('level', mode='before')
    @classmethod
    def normalize_level(cls, v):
        """Normalize skill level to enum values."""
        if isinstance(v, str):
            v_upper = v.upper()
            if v_upper in ['BEGINNER', 'BASIC', 'NOVICE']:
                return SkillLevel.BEGINNER
            elif v_upper in ['INTERMEDIATE', 'MEDIUM', 'PROFICIENT']:
                return SkillLevel.INTERMEDIATE
            elif v_upper in ['ADVANCED', 'EXPERT', 'PROFESSIONAL']:
                return SkillLevel.ADVANCED
        return v

    @field_validator('category', mode='before')
    @classmethod
    def normalize_category(cls, v):
        """Normalize skill category to match enum values."""
        if isinstance(v, str):
            v_lower = v.lower()
            
            # Map common variations to our enum values
            if any(word in v_lower for word in ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript', 'ui', 'ux', 'web dev', 'frontend']):
                return SkillCategory.FRONTEND
            elif any(word in v_lower for word in ['python', 'java', 'node', 'django', 'flask', 'spring', 'api', 'backend', 'server']):
                return SkillCategory.BACKEND
            elif any(word in v_lower for word in ['docker', 'kubernetes', 'ci/cd', 'jenkins', 'devops', 'deployment']):
                return SkillCategory.DEVOPS
            elif any(word in v_lower for word in ['sql', 'mongodb', 'postgres', 'mysql', 'redis', 'database', 'db']):
                return SkillCategory.DATABASE
            elif any(word in v_lower for word in ['aws', 'azure', 'gcp', 'cloud', 'heroku']):
                return SkillCategory.CLOUD
            elif any(word in v_lower for word in ['ai', 'ml', 'machine learning', 'tensorflow', 'pytorch', 'nlp', 'data science']):
                return SkillCategory.AI_ML
            elif any(word in v_lower for word in ['programming', 'language', 'tool', 'framework']):
                # Generic programming/tools -> map to Other
                return SkillCategory.OTHER
            else:
                # Default to Other for unrecognized categories
                return SkillCategory.OTHER
        return v


class AchievementExtracted(BaseModel):
    """Extracted achievement/award data from resume."""
    title: str
    issuer: str = ""
    date: str = ""
    type: str = "award"  # 'award', 'internship', 'other'
    description: str = ""


class CertificateExtracted(BaseModel):
    """Extracted certificate data from resume."""
    name: str  # mapped to title
    issuer: str = ""
    year: str = ""  # mapped to date string
    description: str = ""


class WorkExperienceExtracted(BaseModel):
    """Extracted work experience data from resume."""
    title: str
    company: str  # mapped to organization
    duration: str = ""
    location: str = ""
    description: str = ""


class ResumeExtractedData(BaseModel):
    """Complete extracted resume data matching portfolio schema."""
    # Profile fields
    name: str = ""
    title: str = ""
    location: str = ""
    email: str = ""
    about: str = ""
    github: str = ""
    linkedin: str = ""
    website: str = ""
    
    # Portfolio sections
    # Portfolio sections
    projects: List[ProjectExtracted] = Field(default_factory=list)
    skills: List[SkillExtracted] = Field(default_factory=list)
    work_experience: List[WorkExperienceExtracted] = Field(default_factory=list)
    certifications: List[CertificateExtracted] = Field(default_factory=list)
    achievements: List[AchievementExtracted] = Field(default_factory=list)
    
    @field_validator('projects', 'skills', 'work_experience', 'certifications', 'achievements', mode='before')
    @classmethod
    def ensure_list_fields(cls, v):
        """Ensure all array fields are lists."""
        return v if isinstance(v, list) else []


class ResumeUploadResponse(BaseModel):
    """Response after successful resume upload and parsing."""
    resume_id: int
    extracted_data: ResumeExtractedData
    message: str


class ResumeConfirmRequest(BaseModel):
    """Request to confirm and save resume data to portfolio."""
    resume_id: int
    approved_data: ResumeExtractedData


class ResumeOut(BaseModel):
    """Resume record output schema."""
    id: int
    owner_id: int
    filename: str
    file_type: str
    parsed_data: Optional[dict] = None
    is_saved: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Pydantic v2
