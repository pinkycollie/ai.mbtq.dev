from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import uvicorn
from dotenv import load_dotenv

from app.core.cors import setup_cors
from app.api.routes import router as api_router

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Super Developer API",
    description="Backend API for the Super Developer Platform",
    version="1.0.0",
)

# Setup CORS
setup_cors(app)

# Include API routes
app.include_router(api_router, prefix="/api")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Super Developer API",
        "docs_url": "/docs",
        "redoc_url": "/redoc",
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run the application if executed directly
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
