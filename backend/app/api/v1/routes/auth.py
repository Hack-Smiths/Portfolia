# app/api/v1/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.models.user import User
from app.utils.auth import hash_password, verify_password, create_access_token
from app.database import get_db
from app.models.profile import Profile

router = APIRouter()
@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

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

    return new_user

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token(data={
        "sub": db_user.email,
        "username": db_user.username
    })
    return {"access_token": token, "token_type": "bearer"}