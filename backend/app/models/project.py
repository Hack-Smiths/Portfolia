from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from app.utils.database import Base

class Project(Base):
    __tablename__ = "project"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    type = Column(String)  # "github" or "others"
    stack = Column(ARRAY(String))
    features = Column(ARRAY(String))
    stars = Column(Integer, default=0)
    forks = Column(Integer, default=0)
    link = Column(String)
    
    imported = Column(Boolean, default=False)
    ai_summary = Column(Boolean, default=False)
    saved = Column(Boolean, default=False)

    last_updated = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("user.id"))

    owner = relationship("User", back_populates="projects")
