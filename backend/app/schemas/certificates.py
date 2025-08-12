from pydantic import BaseModel
from typing import Optional

class CertificateBase(BaseModel):
    title: str
    issuer: str
    year: Optional[str] = None
    credential_id: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class CertificateCreate(CertificateBase):
    pass

class CertificateUpdate(CertificateBase):
    pass

class CertificateOut(CertificateBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
