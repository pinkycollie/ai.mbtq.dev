from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Sample data
items = [
    {"id": 1, "name": "Item 1", "description": "This is item 1"},
    {"id": 2, "name": "Item 2", "description": "This is item 2"},
]

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None

@router.get("/", response_model=List[Item])
async def read_items():
    return items

@router.get("/{item_id}", response_model=Item)
async def read_item(item_id: int):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.post("/", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    new_id = max(item["id"] for item in items) + 1
    new_item = {"id": new_id, **item.dict()}
    items.append(new_item)
    return new_item
