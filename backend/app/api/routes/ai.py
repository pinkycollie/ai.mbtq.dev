from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from app.services.ai_service import AIService, AIModelRequest, AIModelResponse

router = APIRouter()

# Initialize AI service
ai_service = AIService()

class CompletionRequest(BaseModel):
    prompt: str
    max_tokens: int = 100
    temperature: float = 0.7
    model: Optional[str] = None

class CompletionResponse(BaseModel):
    text: str
    model: str
    usage: Dict[str, int]

@router.post("/generate", response_model=CompletionResponse)
async def generate_text(request: CompletionRequest):
    """Generate text using AI models."""
    try:
        ai_request = AIModelRequest(
            prompt=request.prompt,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            model=request.model or "gpt-3.5-turbo"
        )
        
        response = await ai_service.generate_text(ai_request)
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating text: {str(e)}")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    max_tokens: int = 100
    temperature: float = 0.7
    model: Optional[str] = None

@router.post("/chat", response_model=CompletionResponse)
async def chat_completion(request: ChatRequest):
    """Generate chat completion using AI models."""
    try:
        # Format the chat messages into a prompt
        prompt = "\n".join([f"{msg.role}: {msg.content}" for msg in request.messages])
        
        ai_request = AIModelRequest(
            prompt=prompt,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            model=request.model or "gpt-3.5-turbo"
        )
        
        response = await ai_service.generate_text(ai_request)
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating chat completion: {str(e)}")
