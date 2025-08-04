# app/models/user.py
from sqlalchemy import Column, Integer, String
from app.utils.database import Base


from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    projects = relationship("Project", back_populates="user", cascade="all, delete")
