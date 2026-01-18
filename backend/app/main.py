

from fastapi import FastAPI
from app.api.v1.routes import summary, user, auth, project, achievements, skills, profile, preview, portfolio, cron, resume, ai
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.models.project import Project  # This ensures both classes are registered


from fastapi import FastAPI, Request, Response
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from app.utils.limiter import limiter
import os

from fastapi_csrf_protect.exceptions import CsrfProtectError

app = FastAPI()
app.state.limiter = limiter

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.qrserver.com;"
    return response

# Enforce HTTPS in production
if os.getenv("ENV") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)

# Trusted Host Middleware
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["portfolia-ai.vercel.app", "localhost", "127.0.0.1", "*.railway.app", "*.render.com"]
)

@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please try again later to ensure the security of your account."},
    )

origins = [
    "https://portfolia-ai.vercel.app",  # your deployed frontend
    "http://localhost:8080",             # local frontend (localhost)
    "http://127.0.0.1:8080",            # local frontend (127.0.0.1)
    "http://localhost:5173",            # vite default port
    "http://127.0.0.1:5173",            # vite default port (127.0.0.1)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(cron.router)
app.include_router(summary.router, tags=["GitHub Summary"])

# app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub"])
app.include_router(auth.router, tags=['Auth'])
app.include_router(user.router, tags=['Auth'])
app.include_router(project.router, prefix="/projects", tags=["Projects"])
app.include_router(achievements.router)
app.include_router(skills.router)
app.include_router(profile.router)
app.include_router(preview.router)
app.include_router(portfolio.router)
app.include_router(resume.router, tags=["Resumes"])
from app.api.v1.routes import contact
app.include_router(contact.router)
