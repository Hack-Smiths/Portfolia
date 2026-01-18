# app/schemas/user.py
from pydantic import BaseModel, EmailStr, validator
import re

class UserCreate(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str

    @validator("username")
    def validate_username(cls, v):
        if not re.match(r"^[a-zA-Z0-9][a-zA-Z0-9_-]{1,28}[a-zA-Z0-9]$", v):
            raise ValueError(
                "Must be 3-30 chars, alphanumeric/underscore/hyphen, no start/end special chars"
            )
        if "__" in v or "--" in v or "-_" in v or "_-" in v:
            raise ValueError("No consecutive special characters")
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    username: str
    email: EmailStr

    class Config:
        orm_mode = True  # allows Pydantic to work directly with SQLAlchemy objects


class UsernameResponse(BaseModel):
    """Response schema for GET /me/username helper endpoint"""
    username: str

