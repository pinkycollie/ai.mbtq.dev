import os
import json
import httpx
import logging
from typing import Dict, Any, List, Optional, Union
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIModelRequest(BaseModel):
    prompt: str
    max_tokens: int = 100
    temperature: float = 0.7
    model: str = "gpt-3.5-turbo"
    
class AIModelResponse(BaseModel):
    text: str
    model: str
    usage: Dict[str, int]

class AIService:
    """Service for interacting with AI models."""
    
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.huggingface_api_key = os.getenv("HUGGINGFACE_API_KEY")
        self.anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
        self.default_model = os.getenv("DEFAULT_AI_MODEL", "gpt-3.5-turbo")
        
        # Initialize HTTP client
        self.client = httpx.AsyncClient(timeout=60.0)
        
    async def generate_text(self, request: AIModelRequest) -> AIModelResponse:
        """Generate text using the specified AI model."""
        model = request.model or self.default_model
        
        if "gpt" in model.lower():
            return await self._generate_with_openai(request)
        elif "claude" in model.lower():
            return await self._generate_with_anthropic(request)
        else:
            return await self._generate_with_huggingface(request)
    
    async def _generate_with_openai(self, request: AIModelRequest) -> AIModelResponse:
        """Generate text using OpenAI models."""
        if not self.openai_api_key:
            raise ValueError("OpenAI API key not configured")
        
        try:
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.openai_api_key}"
            }
            
            payload = {
                "model": request.model,
                "messages": [{"role": "user", "content": request.prompt}],
                "max_tokens": request.max_tokens,
                "temperature": request.temperature
            }
            
            async with self.client as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers=headers,
                    json=payload
                )
                
                response.raise_for_status()
                result = response.json()
                
                return AIModelResponse(
                    text=result["choices"][0]["message"]["content"],
                    model=result["model"],
                    usage=result["usage"]
                )
                
        except Exception as e:
            logger.error(f"Error generating text with OpenAI: {str(e)}")
            raise
    
    async def _generate_with_anthropic(self, request: AIModelRequest) -> AIModelResponse:
        """Generate text using Anthropic Claude models."""
        if not self.anthropic_api_key:
            raise ValueError("Anthropic API key not configured")
        
        try:
            headers = {
                "Content-Type": "application/json",
                "x-api-key": self.anthropic_api_key,
                "anthropic-version": "2023-06-01"
            }
            
            payload = {
                "model": request.model,
                "prompt": f"\n\nHuman: {request.prompt}\n\nAssistant:",
                "max_tokens_to_sample": request.max_tokens,
                "temperature": request.temperature
            }
            
            async with self.client as client:
                response = await client.post(
                    "https://api.anthropic.com/v1/complete",
                    headers=headers,
                    json=payload
                )
                
                response.raise_for_status()
                result = response.json()
                
                # Anthropic doesn't provide usage stats in the same format
                usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
                
                return AIModelResponse(
                    text=result["completion"],
                    model=request.model,
                    usage=usage
                )
                
        except Exception as e:
            logger.error(f"Error generating text with Anthropic: {str(e)}")
            raise
    
    async def _generate_with_huggingface(self, request: AIModelRequest) -> AIModelResponse:
        """Generate text using Hugging Face models."""
        if not self.huggingface_api_key:
            raise ValueError("Hugging Face API key not configured")
        
        try:
            headers = {
                "Authorization": f"Bearer {self.huggingface_api_key}"
            }
            
            payload = {
                "inputs": request.prompt,
                "parameters": {
                    "max_new_tokens": request.max_tokens,
                    "temperature": request.temperature,
                    "return_full_text": False
                }
            }
            
            model_url = f"https://api-inference.huggingface.co/models/{request.model}"
            
            async with self.client as client:
                response = await client.post(
                    model_url,
                    headers=headers,
                    json=payload
                )
                
                response.raise_for_status()
                result = response.json()
                
                # Hugging Face returns different response formats based on the model
                text = result[0]["generated_text"] if isinstance(result, list) else result["generated_text"]
                
                # Hugging Face doesn't provide usage stats
                usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
                
                return AIModelResponse(
                    text=text,
                    model=request.model,
                    usage=usage
                )
                
        except Exception as e:
            logger.error(f"Error generating text with Hugging Face: {str(e)}")
            raise
