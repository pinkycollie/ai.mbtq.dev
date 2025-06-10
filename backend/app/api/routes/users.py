from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional

router = APIRouter()

# Sample data
users = [
    {"id": 1, "name": "User 1", "email": "user1@example.com"},
    {"id": 2, "name": "User 2", "email": "user2@example.com"},
]

class User(BaseModel):
    id: int
    name: str
    email: EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr

@router.get("/", response_model=List[User])
async def read_users():
    return users

@router.get("/{user_id}", response_model=User)
async def read_user(user_id: int):
    user = next((user for user in users if user["id"] == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    new_id = max(user["id"] for user in users) + 1
    new_user = {"id": new_id, **user.dict()}
    users.append(new_user)
    return new_user
