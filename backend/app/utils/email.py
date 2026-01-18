from dotenv import load_dotenv
import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional

load_dotenv()

async def send_reset_email(email: str, token: str):
    """
    Sends a password reset email to the user.
    If SMTP settings are missing, it prints to console (for development).
    """
    # Fetch settings inside function to ensure environment is loaded
    SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "https://portfolia-ai.vercel.app/")

    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"
    
    subject = "Password Reset Request - PortFolia"
    body = f"""
    Hi,
    
    You requested to reset your password for your PortFolia account. 
    Click the link below to set a new password:
    
    {reset_link}
    
    This link will expire in 1 hour.
    
    If you didn't request this, please ignore this email.
    
    Best,
    The PortFolia Team
    """
    
    if not SMTP_USER or not SMTP_PASSWORD:
        print("\n" + "="*50)
        print("DEVELOPMENT MODE: SMTP settings missing.")
        print(f"To: {email}")
        print(f"Subject: {subject}")
        print(f"Body: {body}")
        print("="*50 + "\n")
        return True

    message = MIMEMultipart()
    message["From"] = SMTP_USER
    message["To"] = email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            use_tls=SMTP_PORT == 465,
            start_tls=SMTP_PORT == 587,
        )
        print(f"Successfully sent reset email to {email}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
