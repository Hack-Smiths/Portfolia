from app.database import engine
from app.models import user  # import all model files

user.Base.metadata.create_all(bind=engine)
