from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from app.utils.database import Base


class WorkExperience(Base):
    __tablename__ = "work_experience"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    duration = Column(String, nullable=True)  # e.g., "Jun 2024 - Aug 2024"
    location = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    skills = Column(ARRAY(String))  # PostgreSQL Array for skills
    status = Column(String, nullable=True)
    owner = relationship("User", back_populates="work_experiences")
