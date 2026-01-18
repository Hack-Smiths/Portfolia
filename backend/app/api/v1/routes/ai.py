"""
AI-related endpoints (e.g., project description enhancement).
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.auth_user import get_current_user
from app.database import get_db
from app.schemas.ai import EnhanceProjectRequest, EnhanceProjectResponse, EnhancedVariant
from app.utils.openrouter_client import generate_variants_from_openrouter
from app.models.user import User

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/ping")
async def ping():
    """Health check endpoint to verify AI router is wired correctly."""
    return {"status": "ok", "message": "AI router is wired correctly"}


@router.post(
    "/enhance/project",
    response_model=EnhanceProjectResponse,
    status_code=status.HTTP_200_OK,
)
async def enhance_project_description(
    payload: EnhanceProjectRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Use AI to generate enhanced project description variants.
    Does NOT modify the database. Returns 3 suggestions.
    """
    # Validate tones count (safety check in addition to schema validation)
    if not payload.tones or len(payload.tones) == 0:
        raise HTTPException(status_code=400, detail="At least one tone must be provided.")
    if len(payload.tones) > 2:
        raise HTTPException(status_code=400, detail="At most two tones are allowed.")

    # Basic description guard
    description = payload.description.strip()
    if not description:
        raise HTTPException(status_code=400, detail="Description cannot be empty.")

    # Map length to word range (used only in the prompt text)
    length_map = {
        "short": "40-60 words",
        "medium": "80-120 words",
        "long": "150-200 words",
    }
    length_hint = length_map.get(payload.length, "80-120 words")

    # Determine tones
    primary_tone = payload.tones[0]
    secondary_tone = payload.tones[1] if len(payload.tones) > 1 else None

    # Build the system + user prompt
    system_prompt = (
        "You are an expert technical portfolio writer. "
        "You rewrite software project descriptions to be clear, professional, impactful, "
        "and aligned with industry standards. Never fabricate achievements or metrics."
    )

    tech_stack_str = ", ".join(payload.tech_stack) if payload.tech_stack else "Not specified"

    user_prompt = f"""
Rewrite the following project description.

Project Title: {payload.title}
Current Description: {description}
Tech Stack: {tech_stack_str}

Tone requirements:
- Primary tone: {primary_tone}
"""
    if secondary_tone:
        user_prompt += f"- Secondary tone (subtle): {secondary_tone}\n"

    user_prompt += f"""
Length: {payload.length} description (~{length_hint}).

Rules:
- Primary tone must dominate.
- Secondary tone, if provided, should only lightly influence wording.
- Keep content truthful and concise.
- Do not exaggerate or fabricate metrics.
- Generate exactly 3 variations.
- Each variation must be a single plain-text paragraph.
- Do NOT include headings, titles, bullets, numbering, quotes, or labels like "Variation 1".
- Separate the three variations using the delimiter: |||
- Return ONLY the three paragraphs with this delimiter between them, nothing else.
"""

    full_prompt = system_prompt + "\n\n" + user_prompt

    # Call OpenRouter helper
    try:
        texts = await generate_variants_from_openrouter(full_prompt, n_variants=3)
    except HTTPException:
        # Re-raise as-is so the client gets a friendly message
        raise

    variants = [
        EnhancedVariant(id=index, text=text)
        for index, text in enumerate(texts, start=1)
    ]

    return EnhanceProjectResponse(variants=variants)
