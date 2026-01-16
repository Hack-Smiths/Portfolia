from typing import List, Literal
from pydantic import BaseModel, Field


class EnhanceProjectRequest(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    tech_stack: List[str] = Field(default_factory=list)
    length: Literal["short", "medium", "long"]
    tones: List[str] = Field(..., min_items=1, max_items=2)


class EnhancedVariant(BaseModel):
    id: int
    text: str


class EnhanceProjectResponse(BaseModel):
    variants: List[EnhancedVariant]
