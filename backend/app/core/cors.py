from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import os
import re
import logging

logger = logging.getLogger(__name__)

def parse_cors_origins(origins_str: Optional[str]) -> List[str]:
    """Parse comma-separated origins string into a list."""
    if not origins_str:
        return []
    
    return [origin.strip() for origin in origins_str.split(",") if origin.strip()]

def is_valid_origin(origin: str) -> bool:
    """Validate if an origin is properly formatted."""
    # Basic validation for URL format
    pattern = r'^https?://([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?$'
    
    # Special case for localhost
    if origin.startswith(("http://localhost:", "https://localhost:")):
        return True
    
    # Special case for wildcard domains
    if "*" in origin:
        # Convert wildcard pattern to regex pattern
        regex_pattern = origin.replace(".", r"\.").replace("*", r"[a-zA-Z0-9\-]+")
        return bool(re.match(f"^{regex_pattern}$", "test.example.com"))
    
    # Special case for Backendless domains
    if "backendless.app" in origin or "backendless.com" in origin:
        return True
    
    return bool(re.match(pattern, origin))

def setup_cors(
    app: FastAPI,
    allowed_origins: Optional[List[str]] = None,
    allowed_methods: Optional[List[str]] = None,
    allowed_headers: Optional[List[str]] = None,
    allow_credentials: bool = True,
    expose_headers: Optional[List[str]] = None,
    max_age: int = 600,
) -> None:
    """
    Configure CORS for the FastAPI application with detailed options.
    
    Args:
        app: The FastAPI application instance
        allowed_origins: List of allowed origins (domains)
        allowed_methods: List of allowed HTTP methods
        allowed_headers: List of allowed HTTP headers
        allow_credentials: Whether to allow credentials (cookies, etc.)
        expose_headers: Headers that browsers are allowed to access
        max_age: Maximum age of CORS preflight requests in seconds
    """
    # Get origins from environment variable if not provided
    env_origins = parse_cors_origins(os.getenv("ALLOWED_ORIGINS"))
    
    if allowed_origins is None:
        allowed_origins = env_origins or [
            "http://localhost:3000",            # Local development
            "https://localhost:3000",
            "https://*.replit.app",             # Replit apps
            "https://*.repl.co",                # Replit apps (alternative domain)
            "https://replit.com",               # Replit main site
            "https://*.vercel.app",             # Vercel deployments
            "https://*.backendless.app",        # Backendless app domains
            "https://api.backendless.com",      # Backendless API domain
            "https://develop.backendless.com",  # Backendless development console
            "https://console.backendless.com",  # Backendless console
        ]
    
    # Validate origins
    for origin in allowed_origins:
        if not is_valid_origin(origin) and origin != "*":
            logger.warning(f"Invalid CORS origin format: {origin}")
    
    if allowed_methods is None:
        allowed_methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]
    
    if allowed_headers is None:
        allowed_headers = [
            "Authorization", 
            "Content-Type", 
            "Accept", 
            "Origin", 
            "User-Agent",
            "X-Requested-With",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
            "application-id",  # Backendless specific header
            "api-key",         # Backendless specific header
            "user-token",      # Backendless specific header
            "secret-key",      # Backendless specific header
        ]
    
    if expose_headers is None:
        expose_headers = [
            "Content-Length", 
            "Content-Type", 
            "X-Request-ID",
            "user-token",      # Expose Backendless user token
        ]
    
    # Log CORS configuration
    logger.info(f"Setting up CORS with origins: {allowed_origins}")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=allow_credentials,
        allow_methods=allowed_methods,
        allow_headers=allowed_headers,
        expose_headers=expose_headers,
        max_age=max_age,
    )
    
    # Add a middleware to handle wildcard domains
    @app.middleware("http")
    async def handle_wildcard_origins(request, call_next):
        origin = request.headers.get("origin")
        
        # If origin is present and we have wildcard origins
        if origin and any("*" in allowed_origin for allowed_origin in allowed_origins):
            for allowed_origin in allowed_origins:
                if "*" in allowed_origin:
                    # Convert wildcard pattern to regex pattern
                    pattern = allowed_origin.replace(".", r"\.").replace("*", r"[a-zA-Z0-9\-]+")
                    if re.match(f"^{pattern}$", origin):
                        # Add the specific origin to the allowed origins
                        app.add_middleware(
                            CORSMiddleware,
                            allow_origins=[origin],
                            allow_credentials=allow_credentials,
                            allow_methods=allowed_methods,
                            allow_headers=allowed_headers,
                            expose_headers=expose_headers,
                            max_age=max_age,
                        )
                        break
        
        response = await call_next(request)
        return response
