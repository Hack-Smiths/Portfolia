from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.models.user import User
from app.utils.auth import hash_password, verify_password, create_access_token
from app.database import get_db
from app.models.profile import Profile
from app.schemas.auth import SignupResponse
from app.utils.limiter import limiter
from fastapi_csrf_protect import CsrfProtect
from app.utils.security import sanitize_html

import secrets
from datetime import datetime, timedelta
from app.schemas.password_reset import PasswordResetRequest, PasswordResetConfirm, TokenValidationResponse
from app.utils.email import send_reset_email

router = APIRouter()

@router.get("/csrf")
def get_csrf_token(response: Response, csrf_protect: CsrfProtect = Depends()):
    """
    Get a CSRF token. The token is set in a cookie and returned in the response header.
    Frontend should read the header and include it in state-changing requests.
    """
    csrf_token, signed_token = csrf_protect.generate_csrf_tokens()
    csrf_protect.set_csrf_cookie(signed_token, response)
    response.headers["X-CSRF-Token"] = csrf_token
    return {"detail": "CSRF token set"}

@router.post("/password-reset-request")
@limiter.limit("3/hour")
async def password_reset_request(request: Request, reset_data: PasswordResetRequest, db: Session = Depends(get_db)):
    """
    Generate a reset token and send an email to the user.
    """
    user = db.query(User).filter(User.email == reset_data.email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="No account found with this email address.")
    
    token = secrets.token_urlsafe(32)
    user.reset_token = token
    user.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
    db.commit()
    
    await send_reset_email(user.email, token)
    
    return {"message": "Success! A password reset link has been sent to your email."}

@router.get("/validate-reset-token/{token}", response_model=TokenValidationResponse)
def validate_reset_token(token: str, db: Session = Depends(get_db)):
    """
    Verify if a reset token is valid and not expired.
    """
    user = db.query(User).filter(
        User.reset_token == token,
        User.reset_token_expires > datetime.utcnow()
    ).first()
    
    if not user:
        return {"valid": False}
    
    return {"valid": True, "email": user.email}

@router.post("/password-reset-confirm")
@limiter.limit("3/hour")
def password_reset_confirm(request: Request, confirm_data: PasswordResetConfirm, db: Session = Depends(get_db)):
    """
    Reset the user's password using a valid token.
    """
    user = db.query(User).filter(
        User.reset_token == confirm_data.token,
        User.reset_token_expires > datetime.utcnow()
    ).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Update password and clear token
    user.hashed_password = hash_password(confirm_data.new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
    
    return {"message": "Password reset successful. You can now log in with your new password."}

@router.post("/signup", response_model=SignupResponse)
@limiter.limit("3/hour")
def signup(request: Request, response: Response, user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check if username already exists
    if db.query(User).filter(User.username == user.username.lower()).first():
        raise HTTPException(status_code=409, detail="Username already taken")

    # Store lowercase username
    username_lower = user.username.lower()

    # Create User (DB MODEL)
    hashed_pw = hash_password(user.password)
    new_user = User(
        email=user.email,
        username=username_lower,
        full_name=user.full_name,
        hashed_password=hashed_pw,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # 🔑 new_user.id is now available

    # ✅ Create Profile using new_user.id (NOT user.id)
    profile = Profile(
        user_id=new_user.id,
        name=new_user.full_name or new_user.username,
        email=new_user.email,
        title="",
        location="",
        bio="",
        github="",
        linkedin="",
        website="",
        avatar="",
    )

    db.add(profile)
    db.commit()

    access_token = create_access_token(
        data={"sub": new_user.email}
    )

    csrf_token, signed_token = csrf_protect.generate_csrf_tokens()
    csrf_protect.set_csrf_cookie(signed_token, response)
    response.headers["X-CSRF-Token"] = csrf_token

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "full_name": new_user.full_name,
        }
    }


@router.post("/login")
@limiter.limit("5/15minutes")
def login(request: Request, response: Response, user: UserLogin, db: Session = Depends(get_db), csrf_protect: CsrfProtect = Depends()):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token(data={
        "sub": db_user.email,
        "username": db_user.username
    })

    csrf_token, signed_token = csrf_protect.generate_csrf_tokens()
    csrf_protect.set_csrf_cookie(signed_token, response)
    response.headers["X-CSRF-Token"] = csrf_token

    return {"access_token": token, "token_type": "bearer"}


@router.get("/check-username/{username}")
def check_username(username: str, db: Session = Depends(get_db)):
    username_lower = username.lower()
    exists = db.query(User).filter(User.username == username_lower).first()
    return {"available": not exists, "username": username}