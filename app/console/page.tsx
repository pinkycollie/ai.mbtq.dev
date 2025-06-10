"use client"

import { useState } from "react"
import { PlatformSidebar } from "@/components/platform-sidebar"
import { VercelTerminal } from "@/components/vercel-terminal"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
import { Terminal, Server, Database, Play, Code, RefreshCw, Download, Upload, GitBranch, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AICodeGenerator } from "@/components/ai-code-generator"

const fastApiCode = `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Vercel FastAPI Backend")

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
    return {"message": "Welcome to the Vercel FastAPI Backend"}

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

export default function ConsolePage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("terminal")
  const [activeIntegrationTab, setActiveIntegrationTab] = useState("fastapi")

  const terminals = {
    terminal: {
      title: "Vercel CLI",
      icon: <Terminal className="h-4 w-4 mr-2" />,
      command: "",
      description: "Run Vercel CLI commands",
    },
    dev: {
      title: "Development Server",
      icon: <Play className="h-4 w-4 mr-2" />,
      command: "npm run dev",
      description: "Run the Next.js development server",
    },
    deploy: {
      title: "Deploy",
      icon: <Upload className="h-4 w-4 mr-2" />,
      command: "vercel deploy",
      description: "Deploy your project to Vercel",
    },
    fastapi: {
      title: "FastAPI Server",
      icon: <Server className="h-4 w-4 mr-2" />,
      command: "uvicorn main:app --reload",
      description: "Run the FastAPI development server",
    },
  }

  return (
    <>
      <PlatformSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-semibold">Developer Console</h1>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Projects</CardTitle>
                <CardDescription>Active development projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">Next.js + FastAPI projects</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between text-primary">
                  View all projects
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Deployments</CardTitle>
                <CardDescription>Recent project deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Deployments this week</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between text-primary">
                  View deployments
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">FastAPI Services</CardTitle>
                <CardDescription>Python backend services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">Active FastAPI services</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between text-primary">
                  Manage services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                Developer Console
              </CardTitle>
              <CardDescription>Run commands and manage your projects from the terminal</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="terminal" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    {Object.entries(terminals).map(([key, { title, icon }]) => (
                      <TabsTrigger key={key} value={key} onClick={() => setActiveTab(key)}>
                        {icon}
                        {title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  </Button>
                </div>

                {Object.entries(terminals).map(([key, { command, description }]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <p className="text-sm text-muted-foreground mb-2">{description}</p>
                    <VercelTerminal
                      defaultCommand={activeTab === key ? command : ""}
                      height="400px"
                      fullscreen={isFullscreen}
                      onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                      onClose={isFullscreen ? () => setIsFullscreen(false) : undefined}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                FastAPI Integration
              </CardTitle>
              <CardDescription>Integrate Python FastAPI backend with your Next.js frontend</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="fastapi" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="fastapi" className="flex-1" onClick={() => setActiveIntegrationTab("fastapi")}>
                    <Server className="h-4 w-4 mr-2" />
                    FastAPI Backend
                  </TabsTrigger>
                  <TabsTrigger value="nextapi" className="flex-1" onClick={() => setActiveIntegrationTab("nextapi")}>
                    <Code className="h-4 w-4 mr-2" />
                    Next.js API Route
                  </TabsTrigger>
                  <TabsTrigger
                    value="integration"
                    className="flex-1"
                    onClick={() => setActiveIntegrationTab("integration")}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Data Fetching
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="fastapi" className="mt-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">FastAPI Backend</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a Python FastAPI backend with RESTful endpoints
                    </p>
                    <CodeEditor defaultLanguage="python" defaultValue={fastApiCode} height="400px" />
                  </div>
                </TabsContent>

                <TabsContent value="nextapi" className="mt-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Next.js API Route Proxy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a Next.js API route to proxy requests to your FastAPI backend
                    </p>
                    <CodeEditor defaultLanguage="typescript" defaultValue={nextApiCode} height="400px" />
                  </div>
                </TabsContent>

                <TabsContent value="integration" className="mt-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Data Fetching</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Fetch data from your FastAPI backend in your Next.js components
                    </p>
                    <CodeEditor defaultLanguage="typescript" defaultValue={nextFetchCode} height="400px" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Project
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                AI Code Generation
              </CardTitle>
              <CardDescription>Generate code using natural language prompts</CardDescription>
            </CardHeader>
            <CardContent>
              <AICodeGenerator />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="h-5 w-5 mr-2" />
                Recent Deployments
              </CardTitle>
              <CardDescription>View your recent project deployments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Badge variant="success" className="mr-2">
                        Success
                      </Badge>
                      <div>
                        <h3 className="font-medium">e-commerce-platform</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <GitBranch className="h-3 w-3 mr-1" />
                          main
                          <span className="mx-2">•</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <Badge>production</Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>https://e-commerce-platform.vercel.app</div>
                    <div>Duration: 45s</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Badge variant="success" className="mr-2">
                        Success
                      </Badge>
                      <div>
                        <h3 className="font-medium">marketing-website</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <GitBranch className="h-3 w-3 mr-1" />
                          feature/new-landing
                          <span className="mx-2">•</span>
                          <span>5 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">preview</Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>https://feature-new-landing.vercel.app</div>
                    <div>Duration: 38s</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Badge variant="destructive" className="mr-2">
                        Failed
                      </Badge>
                      <div>
                        <h3 className="font-medium">admin-dashboard</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <GitBranch className="h-3 w-3 mr-1" />
                          fix/auth-issue
                          <span className="mx-2">•</span>
                          <span>1 day ago</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">preview</Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>Build failed: TypeScript error</div>
                    <div>Duration: 22s</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-primary">
                View all deployments
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
