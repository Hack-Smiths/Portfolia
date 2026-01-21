# app/schemas/auth.py
from pydantic import BaseModel

class SignupUser(BaseModel):
    id: int
    username: str
    email: str
    full_name: str | None = None

class SignupResponse(BaseModel):
    message: str
    access_token: str | None = None
    token_type: str | None = None
    user: SignupUser | None = None
    email: str | None = None
    is_verified: bool = False
