from pydantic import BaseModel, EmailStr
from typing import Optional

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

class TokenValidationResponse(BaseModel):
    valid: bool
    email: Optional[str] = None
