from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import List
from app.dependencies.auth_user import get_db, get_current_user
from app.models.user import User
from app.models.contact_message import ContactMessage

router = APIRouter(prefix="/api/contact", tags=["Contact"])

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: str
    
    class Config:
        from_attributes = True

@router.post("/{username}", status_code=status.HTTP_201_CREATED)
def send_contact_message(
    username: str,
    message_data: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """
    Send a message to a portfolio owner by username.
    Public endpoint.
    """
    # Find user by username
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_message = ContactMessage(
        user_id=user.id,
        name=message_data.name,
        email=message_data.email,
        message=message_data.message
    )
    
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    return {"message": "Message sent successfully"}

@router.get("/messages", response_model=List[ContactMessageResponse])
def get_my_messages(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all messages sent to the current user.
    """
    messages = db.query(ContactMessage).filter(
        ContactMessage.user_id == current_user.id
    ).order_by(ContactMessage.created_at.desc()).all()
    
    return messages
