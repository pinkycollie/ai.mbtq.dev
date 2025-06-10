from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form, Body, Header
from fastapi.responses import JSONResponse
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, EmailStr

from app.services.backendless_service import BackendlessService

router = APIRouter()

# Initialize Backendless service
backendless_service = BackendlessService()

# Auth models
class UserRegistration(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    created: Optional[str] = None
    updated: Optional[str] = None

# Data models
class DataObject(BaseModel):
    data: Dict[str, Any]

class DataQuery(BaseModel):
    table_name: str
    where_clause: Optional[str] = None
    page_size: int = 100
    offset: int = 0
    sort_by: Optional[str] = None
    related: Optional[List[str]] = None

class DataResponse(BaseModel):
    objects: List[Dict[str, Any]]

# Email model
class EmailRequest(BaseModel):
    subject: str
    body: str
    recipients: List[str]

# Auth routes
@router.post("/auth/register", response_model=UserResponse)
async def register_user(
    user: UserRegistration,
    origin: Optional[str] = Header(None)
):
    """Register a new user."""
    try:
        result = await backendless_service.register_user(
            email=user.email,
            password=user.password,
            name=user.name
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/auth/login")
async def login_user(
    user: UserLogin,
    origin: Optional[str] = Header(None)
):
    """Login a user."""
    try:
        result = await backendless_service.login(
            email=user.email,
            password=user.password
        )
        
        # Create response with user-token header
        response = JSONResponse(content=result)
        if "user-token" in result:
            response.headers["user-token"] = result["user-token"]
        
        return response
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.get("/auth/logout")
async def logout_user(
    user_token: Optional[str] = Header(None, alias="user-token")
):
    """Logout the current user."""
    if user_token:
        backendless_service.user_token = user_token
        
    success = await backendless_service.logout()
    if not success:
        raise HTTPException(status_code=400, detail="Failed to logout")
    return {"message": "Logged out successfully"}

@router.get("/auth/current-user")
async def get_current_user(
    user_token: Optional[str] = Header(None, alias="user-token")
):
    """Get the current user."""
    if user_token:
        backendless_service.user_token = user_token
        
    user = await backendless_service.get_current_user()
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

# Data routes
@router.post("/data/{table_name}")
async def create_object(table_name: str, data: Dict[str, Any] = Body(...)):
    """Create a new object in a data table."""
    try:
        result = await backendless_service.create_object(table_name, data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/data/{table_name}")
async def get_objects(
    table_name: str,
    where_clause: Optional[str] = None,
    page_size: int = 100,
    offset: int = 0,
    sort_by: Optional[str] = None,
    related: Optional[str] = None
):
    """Get objects from a data table."""
    try:
        related_list = related.split(",") if related else None
        result = await backendless_service.get_objects(
            table_name=table_name,
            where_clause=where_clause,
            page_size=page_size,
            offset=offset,
            sort_by=sort_by,
            related=related_list
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/data/{table_name}/{object_id}")
async def get_object_by_id(
    table_name: str,
    object_id: str,
    related: Optional[str] = None
):
    """Get an object by ID."""
    try:
        related_list = related.split(",") if related else None
        result = await backendless_service.get_object_by_id(
            table_name=table_name,
            object_id=object_id,
            related=related_list
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/data/{table_name}/{object_id}")
async def update_object(
    table_name: str,
    object_id: str,
    data: Dict[str, Any] = Body(...)
):
    """Update an object."""
    try:
        result = await backendless_service.update_object(
            table_name=table_name,
            object_id=object_id,
            data=data
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/data/{table_name}/{object_id}")
async def delete_object(table_name: str, object_id: str):
    """Delete an object."""
    success = await backendless_service.delete_object(table_name, object_id)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to delete object")
    return {"message": "Object deleted successfully"}

# File routes
@router.post("/files")
async def upload_file(
    file: UploadFile = File(...),
    folder: Optional[str] = Form(None)
):
    """Upload a file to Backendless."""
    try:
        # Save the uploaded file temporarily
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Upload to Backendless
        result = await backendless_service.upload_file(temp_file_path, folder)
        
        # Clean up temporary file
        import os
        os.remove(temp_file_path)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/files/{file_path:path}")
async def delete_file(file_path: str):
    """Delete a file from Backendless."""
    success = await backendless_service.delete_file(file_path)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to delete file")
    return {"message": "File deleted successfully"}

# Email routes
@router.post("/email")
async def send_email(email_request: EmailRequest):
    """Send an email using Backendless."""
    success = await backendless_service.send_email(
        subject=email_request.subject,
        body=email_request.body,
        recipients=email_request.recipients
    )
    if not success:
        raise HTTPException(status_code=400, detail="Failed to send email")
    return {"message": "Email sent successfully"}

# Messaging routes
@router.post("/messaging/{channel}")
async def publish_message(channel: str, message: Any = Body(...)):
    """Publish a message to a real-time channel."""
    success = await backendless_service.publish_message(channel, message)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to publish message")
    return {"message": "Message published successfully"}
