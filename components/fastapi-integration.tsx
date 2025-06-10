"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
import { Terminal } from "@/components/terminal"
import { Server, Database, Play, Code, RefreshCw, Download } from "lucide-react"

const pythonCode = `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Super Developer API")

# Sample data
items = [
    {"id": 1, "name": "Item 1", "description": "This is item 1"},
    {"id": 2, "name": "Item 2", "description": "This is item 2"},
]

# Pydantic models
class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Welcome to the Super Developer API"}

@app.get("/items/", response_model=List[Item])
def read_items():
    return items

@app.get("/items/{item_id}", response_model=Item)
def read_item(item_id: int):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/items/", response_model=Item)
def create_item(item: ItemCreate):
    new_id = max(item["id"] for item in items) + 1
    new_item = {"id": new_id, **item.dict()}
    items.append(new_item)
    return new_item

@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: ItemCreate):
    item_index = next((i for i, item in enumerate(items) if item["id"] == item_id), None)
    if item_index is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    items[item_index] = {"id": item_id, **item.dict()}
    return items[item_index]

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    item_index = next((i for i, item in enumerate(items) if item["id"] == item_id), None)
    if item_index is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    items.pop(item_index)
    return {"message": "Item deleted successfully"}
`

const nextApiCode = `// pages/api/proxy/[...path].js
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

// Create proxy instance
const apiProxy = createProxyMiddleware({
  target: process.env.FASTAPI_URL || 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy/': '/', // remove /api/proxy prefix
  },
});

// Disable body parsing, let http-proxy handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Forward the request to the FastAPI backend
  return apiProxy(req, res);
}
`

const nextFetchCode = `// Example of fetching data from FastAPI in a Next.js component
'use client'

import { useEffect, useState } from 'react'

interface Item {
  id: number
  name: string
  description?: string
}

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/proxy/items')
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
`

export function FastAPIIntegration() {
  const [activeTab, setActiveTab] = useState("fastapi")

  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="h-5 w-5 mr-2" />
          FastAPI Integration
        </CardTitle>
        <CardDescription>Integrate Python FastAPI backend with your Next.js frontend</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="fastapi" className="w-full">
          <TabsList className="bg-gray-950 border border-gray-800 w-full">
            <TabsTrigger
              value="fastapi"
              className="flex-1 data-[state=active]:bg-gray-900"
              onClick={() => setActiveTab("fastapi")}
            >
              <Server className="h-4 w-4 mr-2" />
              FastAPI Backend
            </TabsTrigger>
            <TabsTrigger
              value="nextapi"
              className="flex-1 data-[state=active]:bg-gray-900"
              onClick={() => setActiveTab("nextapi")}
            >
              <Code className="h-4 w-4 mr-2" />
              Next.js API Route
            </TabsTrigger>
            <TabsTrigger
              value="integration"
              className="flex-1 data-[state=active]:bg-gray-900"
              onClick={() => setActiveTab("integration")}
            >
              <Database className="h-4 w-4 mr-2" />
              Data Fetching
            </TabsTrigger>
            <TabsTrigger
              value="terminal"
              className="flex-1 data-[state=active]:bg-gray-900"
              onClick={() => setActiveTab("terminal")}
            >
              <Play className="h-4 w-4 mr-2" />
              Run FastAPI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fastapi" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">FastAPI Backend</h3>
              <p className="text-sm text-gray-400 mb-4">Create a Python FastAPI backend with RESTful endpoints</p>
              <CodeEditor defaultLanguage="python" defaultValue={pythonCode} height="400px" />
            </div>
          </TabsContent>

          <TabsContent value="nextapi" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Next.js API Route Proxy</h3>
              <p className="text-sm text-gray-400 mb-4">
                Create a Next.js API route to proxy requests to your FastAPI backend
              </p>
              <CodeEditor defaultLanguage="typescript" defaultValue={nextApiCode} height="400px" />
            </div>
          </TabsContent>

          <TabsContent value="integration" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Data Fetching</h3>
              <p className="text-sm text-gray-400 mb-4">
                Fetch data from your FastAPI backend in your Next.js components
              </p>
              <CodeEditor defaultLanguage="typescript" defaultValue={nextFetchCode} height="400px" />
            </div>
          </TabsContent>

          <TabsContent value="terminal" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Run FastAPI Server</h3>
              <p className="text-sm text-gray-400 mb-4">Start your FastAPI server using Uvicorn</p>
              <Terminal defaultCommand="uvicorn main:app --reload" height="400px" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Project
        </Button>
      </CardFooter>
    </Card>
  )
}
