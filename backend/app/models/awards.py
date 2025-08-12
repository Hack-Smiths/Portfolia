from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from app.utils.database import Base

# app/models/awards.py
class Award(Base):
    __tablename__ = "awards"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))  # changed from user_id
    title = Column(String, nullable=False)
    organization = Column(String, nullable=True)
    year = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)

    owner = relationship("User", back_populates="awards")

