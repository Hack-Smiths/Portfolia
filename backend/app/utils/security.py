import bleach
import os
from pydantic import BaseModel
from fastapi import Depends, Request
from fastapi_csrf_protect import CsrfProtect

class CSRFConfig(BaseModel):
    secret_key: str = os.getenv("CSRF_SECRET_KEY", "your-default-secret-key-at-least-32-chars-long")
    header_name: str = "X-CSRF-Token"
    cookie_key: str = "fastapi-csrf-token"
    cookie_samesite: str = "lax"
    cookie_secure: bool = os.getenv("ENV") == "production"
    cookie_httponly: bool = True

@CsrfProtect.load_config
def get_csrf_config():
    return CSRFConfig()

def validate_csrf(request: Request, csrf_protect: CsrfProtect = Depends()):
    """
    Dependency to validate CSRF token from request headers and cookies.
    """
    csrf_protect.validate_csrf(request)

def sanitize_html(text: str) -> str:
    """
    Strips all HTML tags and dangerous characters from a string.
    """
    if text is None:
        return None
    return bleach.clean(text, tags=[], strip=True)
