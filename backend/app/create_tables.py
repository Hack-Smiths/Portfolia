# main.py or db_init.py

from models import user, project
import models
from utils.database import Base, engine

Base.metadata.create_all(bind=engine)
