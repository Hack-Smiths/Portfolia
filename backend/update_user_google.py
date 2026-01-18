from app.database import engine
from sqlalchemy import text

def add_google_id_column():
    """Adds the google_id column to the user table if it doesn't exist."""
    print("Checking if 'google_id' column exists in 'user' table...")
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE \"user\" ADD COLUMN google_id VARCHAR"))
            conn.commit()
            print("Successfully added 'google_id' column.")
        except Exception as e:
            if "duplicate column name" in str(e):
                print("'google_id' column already exists.")
            else:
                print(f"Error adding column: {e}")

if __name__ == "__main__":
    add_google_id_column()
