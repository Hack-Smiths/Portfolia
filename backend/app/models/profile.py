from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.utils.database import Base  # Assuming you have a Base from database.py

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    name = Column(String(100))
    email = Column(String(100))
    title = Column(String(200))
    location = Column(String(100))
    bio = Column(Text)
    github = Column(String(200))
    linkedin = Column(String(200))
    website = Column(String(200))
    avatar = Column(String(500))

    user = relationship("User", back_populates="profile")
