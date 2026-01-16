from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.utils.database import Base  # Assuming you have a Base from database.py

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), unique=True, nullable=False)

    name = Column(String, nullable=False)
    email = Column(String, nullable=False)

    title = Column(String, default="")
    location = Column(String, default="")
    bio = Column(Text, default="")
    github = Column(String, default="")
    linkedin = Column(String, default="")
    website = Column(String, default="")
    avatar = Column(Text, default="")  # Changed to Text to support base64 image data

    user = relationship("User", back_populates="profile")
