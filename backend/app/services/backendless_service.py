import os
import json
import httpx
import logging
from typing import Dict, Any, List, Optional, Union
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BackendlessConfig(BaseModel):
    """Backendless configuration."""
    app_id: str
    api_key: str
    base_url: str = "https://api.backendless.com"
    version: str = "v1"

class BackendlessService:
    """Service for interacting with Backendless API."""
    
    def __init__(self):
        self.app_id = os.getenv("BACKENDLESS_APP_ID")
        self.api_key = os.getenv("BACKENDLESS_API_KEY")
        self.base_url = os.getenv("BACKENDLESS_BASE_URL", "https://api.backendless.com")
        self.version = os.getenv("BACKENDLESS_VERSION", "v1")
        
        if not self.app_id or not self.api_key:
            logger.warning("Backendless credentials not configured")
        
        # Initialize HTTP client with proper CORS headers
        self.client = httpx.AsyncClient(
            timeout=30.0,
            headers={
                "Content-Type": "application/json",
                "application-id": self.app_id,
                "api-key": self.api_key,
            }
        )
        
        # User token for authenticated requests
        self.user_token = None
    
    def _get_headers(self) -> Dict[str, str]:
        """Get headers for Backendless API requests."""
        headers = {
            "Content-Type": "application/json",
            "application-id": self.app_id,
            "api-key": self.api_key,
        }
        
        if self.user_token:
            headers["user-token"] = self.user_token
        
        return headers
    
    def _get_url(self, path: str) -> str:
        """Get full URL for Backendless API endpoint."""
        return f"{self.base_url}/{self.version}/{self.app_id}/{path}"
    
    async def register_user(self, email: str, password: str, name: Optional[str] = None) -> Dict[str, Any]:
        """Register a new user."""
        try:
            user_data = {
                "email": email,
                "password": password,
            }
            
            if name:
                user_data["name"] = name
            
            async with self.client as client:
                response = await client.post(
                    self._get_url("users/register"),
                    headers=self._get_headers(),
                    json=user_data
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error registering user: {str(e)}")
            raise
    
    async def login(self, email: str, password: str) -> Dict[str, Any]:
        """Login a user."""
        try:
            login_data = {
                "login": email,
                "password": password,
            }
            
            async with self.client as client:
                response = await client.post(
                    self._get_url("users/login"),
                    headers=self._get_headers(),
                    json=login_data
                )
                
                response.raise_for_status()
                result = response.json()
                
                # Store user token for authenticated requests
                if "user-token" in response.headers:
                    self.user_token = response.headers["user-token"]
                
                return result
        except Exception as e:
            logger.error(f"Error logging in: {str(e)}")
            raise
    
    async def logout(self) -> bool:
        """Logout the current user."""
        if not self.user_token:
            return False
        
        try:
            async with self.client as client:
                response = await client.get(
                    self._get_url("users/logout"),
                    headers=self._get_headers()
                )
                
                response.raise_for_status()
                self.user_token = None
                return True
        except Exception as e:
            logger.error(f"Error logging out: {str(e)}")
            return False
    
    async def get_current_user(self) -> Optional[Dict[str, Any]]:
        """Get the current user."""
        if not self.user_token:
            return None
        
        try:
            async with self.client as client:
                response = await client.get(
                    self._get_url("users/current"),
                    headers=self._get_headers()
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error getting current user: {str(e)}")
            return None
    
    async def create_object(self, table_name: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new object in a data table."""
        try:
            async with self.client as client:
                response = await client.post(
                    self._get_url(f"data/{table_name}"),
                    headers=self._get_headers(),
                    json=data
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error creating object in {table_name}: {str(e)}")
            raise
    
    async def get_objects(self, table_name: str, where_clause: Optional[str] = None, 
                         page_size: int = 100, offset: int = 0, 
                         sort_by: Optional[str] = None, 
                         related: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        """Get objects from a data table."""
        try:
            params = {
                "pageSize": page_size,
                "offset": offset,
            }
            
            if where_clause:
                params["where"] = where_clause
            
            if sort_by:
                params["sortBy"] = sort_by
            
            if related:
                params["loadRelations"] = ",".join(related)
            
            async with self.client as client:
                response = await client.get(
                    self._get_url(f"data/{table_name}"),
                    headers=self._get_headers(),
                    params=params
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error getting objects from {table_name}: {str(e)}")
            raise
    
    async def get_object_by_id(self, table_name: str, object_id: str, 
                              related: Optional[List[str]] = None) -> Dict[str, Any]:
        """Get an object by ID."""
        try:
            params = {}
            
            if related:
                params["loadRelations"] = ",".join(related)
            
            async with self.client as client:
                response = await client.get(
                    self._get_url(f"data/{table_name}/{object_id}"),
                    headers=self._get_headers(),
                    params=params
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error getting object {object_id} from {table_name}: {str(e)}")
            raise
    
    async def update_object(self, table_name: str, object_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update an object."""
        try:
            async with self.client as client:
                response = await client.put(
                    self._get_url(f"data/{table_name}/{object_id}"),
                    headers=self._get_headers(),
                    json=data
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error updating object {object_id} in {table_name}: {str(e)}")
            raise
    
    async def delete_object(self, table_name: str, object_id: str) -> bool:
        """Delete an object."""
        try:
            async with self.client as client:
                response = await client.delete(
                    self._get_url(f"data/{table_name}/{object_id}"),
                    headers=self._get_headers()
                )
                
                response.raise_for_status()
                return True
        except Exception as e:
            logger.error(f"Error deleting object {object_id} from {table_name}: {str(e)}")
            return False
    
    async def upload_file(self, file_path: str, folder: Optional[str] = None) -> Dict[str, Any]:
        """Upload a file to Backendless."""
        try:
            url = self._get_url("files")
            if folder:
                url = f"{url}/{folder}"
            
            file_name = os.path.basename(file_path)
            
            with open(file_path, "rb") as f:
                file_data = f.read()
            
            headers = self._get_headers()
            headers.pop("Content-Type", None)  # Let httpx set the correct content type
            
            async with self.client as client:
                response = await client.post(
                    url,
                    headers=headers,
                    files={"file": (file_name, file_data)}
                )
                
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error uploading file {file_path}: {str(e)}")
            raise
    
    async def delete_file(self, file_path: str) -> bool:
        """Delete a file from Backendless."""
        try:
            async with self.client as client:
                response = await client.delete(
                    self._get_url(f"files/{file_path}"),
                    headers=self._get_headers()
                )
                
                response.raise_for_status()
                return True
        except Exception as e:
            logger.error(f"Error deleting file {file_path}: {str(e)}")
            return False
    
    async def send_email(self, subject: str, body: str, recipients: List[str], 
                        attachment_paths: Optional[List[str]] = None) -> bool:
        """Send an email using Backendless."""
        try:
            email_data = {
                "subject": subject,
                "bodyparts": {"textmessage": body},
                "to": recipients,
            }
            
            if attachment_paths:
                attachments = []
                for path in attachment_paths:
                    file_name = os.path.basename(path)
                    with open(path, "rb") as f:
                        file_content = f.read()
                    
                    import base64
                    attachments.append({
                        "fileName": file_name,
                        "fileContent": base64.b64encode(file_content).decode("utf-8")
                    })
                
                email_data["attachment"] = attachments
            
            async with self.client as client:
                response = await client.post(
                    self._get_url("messaging/email"),
                    headers=self._get_headers(),
                    json=email_data
                )
                
                response.raise_for_status()
                return True
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}")
            return False
    
    async def publish_message(self, channel: str, message: Any) -> bool:
        """Publish a message to a real-time channel."""
        try:
            if isinstance(message, dict) or isinstance(message, list):
                message_data = json.dumps(message)
            else:
                message_data = str(message)
            
            async with self.client as client:
                response = await client.post(
                    self._get_url(f"messaging/publish/{channel}"),
                    headers=self._get_headers(),
                    data=message_data
                )
                
                response.raise_for_status()
                return True
        except Exception as e:
            logger.error(f"Error publishing message to channel {channel}: {str(e)}")
            return False
