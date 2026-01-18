from sqlalchemy import text
from app.database import engine

with engine.connect() as conn:
    print("Adding OTP columns to user table...")
    conn.execute(text("ALTER TABLE \"user\" ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE"))
    conn.execute(text("ALTER TABLE \"user\" ADD COLUMN IF NOT EXISTS otp_code VARCHAR"))
    conn.execute(text("ALTER TABLE \"user\" ADD COLUMN IF NOT EXISTS otp_expires TIMESTAMP"))
    conn.commit()
    print("Update complete!")
