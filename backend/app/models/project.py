from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from app.utils.database import Base
from sqlalchemy.dialects.postgresql import ARRAY
class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    description = Column(String)
    type = Column(String)  # e.g., 'github' or 'others'
    stack = Column("tech_stack", String)
    features = Column(String)
    stars = Column(Integer, default=0)
    forks = Column(Integer, default=0)
    last_updated = Column(String)
    link = Column(String)


    user = relationship("User", back_populates="projects")
