# app/schemas/auth.py
from pydantic import BaseModel

class SignupUser(BaseModel):
    id: int
    username: str
    email: str
    full_name: str | None = None

class SignupResponse(BaseModel):
    access_token: str
    token_type: str
    user: SignupUser
