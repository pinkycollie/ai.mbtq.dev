from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="{{ project_name }}",
    description="{{ project_description }}",
    version="1.0.0",
)

# Sample data
items = []

class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

@app.get("/")
async def root():
    return {"message": "Welcome to {{ project_name }}"}

@app.get("/items/", response_model=List[Item])
async def read_items():
    return items

@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    item_dict = item.dict()
    if item.id is None:
        item_dict["id"] = len(items) + 1
    items.append(item_dict)
    return item_dict

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    for item in items:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
