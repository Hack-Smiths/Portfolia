# main.py or db_init.py

from models import user, project, certificates, awards, work_experience
import models
from utils.database import Base, engine
from models import work_experience, certificates, awards, skills

print("Ran")
print(engine.url)
Base.metadata.create_all(bind=engine)
