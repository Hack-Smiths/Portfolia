from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from app.utils.database import Base
# app/models/certificates.py
class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))  # changed from user_id
    title = Column(String, nullable=False)
    issuer = Column(String, nullable=False)
    year = Column(String, nullable=True)
    credential_id = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String, nullable=True)

    owner = relationship("User", back_populates="certificates")

