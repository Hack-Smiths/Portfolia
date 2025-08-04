# main.py or db_init.py

from app.models.user import User
from app.models.project import Project
from app.utils.database import Base, engine

Base.metadata.create_all(bind=engine)
