from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.utils.database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, nullable=False)
    level = Column(String, nullable=False)
    experience = Column(String, nullable=False)
    
    user_id = Column(Integer, ForeignKey("user.id"))  # associate skill to a user
    user = relationship("User", back_populates="skills")
