from pydantic import BaseModel, validator
from typing import Optional
from app.utils.security import sanitize_html

class CertificateBase(BaseModel):
    title: str
    issuer: str
    year: Optional[str] = None
    credential_id: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

    @validator('title', 'issuer', 'year', 'credential_id', 'description', 'status')
    def sanitize_fields(cls, v):
        return sanitize_html(v)

class CertificateCreate(CertificateBase):
    pass

class CertificateUpdate(CertificateBase):
    pass

class CertificateOut(CertificateBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
