import os
import json
import secrets
from typing import Dict, List, Optional, Any, Union
from pydantic import BaseSettings, validator
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    """Application settings."""
    
    # API settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Super Developer API"
    
    # Server settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    RELOAD: bool = os.getenv("RELOAD", "False").lower() in ("true", "1", "t")
    
    # CORS settings
    ALLOWED_ORIGINS: str = os.getenv("ALLOWED_ORIGINS", "")
    ALLOW_CREDENTIALS: bool = os.getenv("ALLOW_CREDENTIALS", "True").lower() in ("true", "1", "t")
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", secrets.token_hex(32))
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Database settings
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")
    
    # AI settings
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    HUGGINGFACE_API_KEY: Optional[str] = os.getenv("HUGGINGFACE_API_KEY")
    ANTHROPIC_API_KEY: Optional[str] = os.getenv("ANTHROPIC_API_KEY")
    DEFAULT_AI_MODEL: str = os.getenv("DEFAULT_AI_MODEL", "gpt-3.5-turbo")
    
    # Replit-specific settings
    IS_REPLIT: bool = os.getenv("REPL_ID") is not None
    REPLIT_DB_URL: Optional[str] = os.getenv("REPLIT_DB_URL")
    
    # Logging settings
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    @validator("DATABASE_URL", pre=True)
    def validate_database_url(cls, v: Optional[str]) -> Optional[str]:
        """Validate and format database URL."""
        if not v:
            return None
        
        # Handle special case for SQLite
        if v.startswith("sqlite:///"):
            return v
        
        # Ensure proper formatting for PostgreSQL
        if v.startswith("postgresql://") and "?sslmode=" not in v:
            return f"{v}?sslmode=require"
        
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create global settings instance
settings = Settings()

class SecretManager:
    """Manager for handling secrets in different environments."""
    
    def __init__(self):
        self.is_replit = settings.IS_REPLIT
        self.replit_db_url = settings.REPLIT_DB_URL
        self.secrets_cache: Dict[str, str] = {}
    
    async def get_secret(self, key: str) -> Optional[str]:
        """Get a secret from the appropriate source."""
        # Check cache first
        if key in self.secrets_cache:
            return self.secrets_cache[key]
        
        # Check environment variables first
        value = os.getenv(key)
        if value:
            self.secrets_cache[key] = value
            return value
        
        # If on Replit, check Replit Secrets
        if self.is_replit:
            try:
                import requests
                response = requests.get(
                    f"{self.replit_db_url}/{key}",
                    headers={"Content-Type": "application/json"}
                )
                if response.status_code == 200:
                    value = response.text
                    self.secrets_cache[key] = value
                    return value
            except Exception as e:
                print(f"Error accessing Replit DB: {e}")
        
        # If not found, return None
        return None
    
    async def set_secret(self, key: str, value: str) -> bool:
        """Set a secret in the appropriate source."""
        # If on Replit, use Replit Secrets
        if self.is_replit and self.replit_db_url:
            try:
                import requests
                response = requests.post(
                    f"{self.replit_db_url}/{key}",
                    data=value,
                    headers={"Content-Type": "application/json"}
                )
                success = response.status_code == 200
                if success:
                    self.secrets_cache[key] = value
                return success
            except Exception as e:
                print(f"Error setting Replit DB secret: {e}")
                return False
        
        # For local development, just set environment variable
        os.environ[key] = value
        self.secrets_cache[key] = value
        return True
    
    async def delete_secret(self, key: str) -> bool:
        """Delete a secret from the appropriate source."""
        # If on Replit, use Replit Secrets
        if self.is_replit and self.replit_db_url:
            try:
                import requests
                response = requests.delete(
                    f"{self.replit_db_url}/{key}",
                    headers={"Content-Type": "application/json"}
                )
                success = response.status_code == 200
                if success and key in self.secrets_cache:
                    del self.secrets_cache[key]
                return success
            except Exception as e:
                print(f"Error deleting Replit DB secret: {e}")
                return False
        
        # For local development, just unset environment variable
        if key in os.environ:
            del os.environ[key]
        if key in self.secrets_cache:
            del self.secrets_cache[key]
        return True

# Create global secret manager instance
secret_manager = SecretManager()
