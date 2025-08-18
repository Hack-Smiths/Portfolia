# app/models/user.py
from sqlalchemy import Column, Integer, String
from app.utils.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True, index=True)
    full_name = Column(String, nullable=False)  # keep original case
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    projects = relationship("Project", back_populates="owner")
    work_experiences = relationship("WorkExperience", back_populates="owner")
    certificates = relationship("Certificate", back_populates="owner")
    awards = relationship("Award", back_populates="owner")
    skills = relationship("Skill", back_populates="user")
    profile = relationship("Profile", back_populates="user", uselist=False)