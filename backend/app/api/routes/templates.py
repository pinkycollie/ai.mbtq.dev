from fastapi import APIRouter, HTTPException, Depends, Body
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from app.templates import template_manager

router = APIRouter()

class TemplateInfo(BaseModel):
    id: str
    name: str
    description: str
    version: str
    author: str
    tags: List[str]

class CreateFromTemplateRequest(BaseModel):
    template_id: str
    destination: str
    variables: Optional[Dict[str, str]] = None

class CreateFromTemplateResponse(BaseModel):
    success: bool
    message: str

@router.get("/", response_model=List[TemplateInfo])
async def list_templates():
    """List all available templates."""
    return template_manager.list_templates()

@router.get("/{template_id}", response_model=TemplateInfo)
async def get_template(template_id: str):
    """Get template by ID."""
    template = template_manager.get_template(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return {
        "id": template_id,
        "name": template["name"],
        "description": template["description"],
        "version": template["version"],
        "author": template["author"],
        "tags": template["tags"],
    }

@router.post("/create", response_model=CreateFromTemplateResponse)
async def create_from_template(request: CreateFromTemplateRequest):
    """Create a new project from a template."""
    success = template_manager.create_from_template(
        request.template_id,
        request.destination,
        request.variables
    )
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to create from template")
    
    return {
        "success": True,
        "message": f"Successfully created project from template {request.template_id}"
    }
