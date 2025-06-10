"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Github, Star, GitFork, Code, Database, Server, Layers, Sparkles } from "lucide-react"

export default function FastAPITemplatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded">
                <Server className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter">SUPER DEVELOPER</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/#tools"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tools
            </Link>
            <Link href="/templates" className="text-sm font-medium text-foreground transition-colors">
              Templates
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/90">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white">FastAPI</Badge>
                  <Badge className="bg-cyan-600 text-white">React</Badge>
                  <Badge className="bg-green-600 text-white">PostgreSQL</Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Full-Stack FastAPI Template
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A modern web application template using FastAPI, React, SQLModel, PostgreSQL, Docker, and more.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="https://github.com/fastapi/full-stack-fastapi-template"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                  <span>31.4k stars</span>
                </div>
                <div className="flex items-center">
                  <GitFork className="mr-1 h-4 w-4" />
                  <span>5.8k forks</span>
                </div>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-background object-cover shadow-xl lg:order-last">
              <div className="h-full w-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 flex items-center justify-center">
                <div className="w-full h-full bg-black/80 rounded-lg border border-gray-800 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm text-gray-400">terminal</div>
                  </div>
                  <div className="flex-1 font-mono text-sm text-green-400 overflow-hidden">
                    <div className="typing-animation">
                      <p>$ git clone https://github.com/fastapi/full-stack-fastapi-template.git</p>
                      <p className="text-gray-400 mt-2">Cloning into 'full-stack-fastapi-template'...</p>
                      <p className="text-white mt-2">✓ Repository cloned successfully!</p>
                      <p>$ cd full-stack-fastapi-template</p>
                      <p>$ docker-compose up -d</p>
                      <p className="text-gray-400 mt-2">Creating network "full-stack-fastapi-template_default"</p>
                      <p className="text-gray-400">Creating full-stack-fastapi-template_backend_1</p>
                      <p className="text-gray-400">Creating full-stack-fastapi-template_frontend_1</p>
                      <p className="text-gray-400">Creating full-stack-fastapi-template_db_1</p>
                      <p className="text-white mt-2">✓ Services started successfully!</p>
                      <p className="text-blue-400 mt-2">Backend running at: http://localhost:8000</p>
                      <p className="text-blue-400">Frontend running at: http://localhost:3000</p>
                      <p className="mt-2 flex items-center">
                        $ <span className="ml-1 animate-pulse">|</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Everything You Need to Build Modern Web Apps
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                This template provides a complete foundation for building full-stack applications with FastAPI and
                React.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-blue-600/10 p-3 rounded-full mb-2">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">FastAPI Backend</h3>
              <p className="text-center text-muted-foreground">
                Modern, fast, web framework for building APIs with Python based on standard type hints.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>High performance</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Automatic API documentation</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Type safety with Pydantic</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-purple-600/10 p-3 rounded-full mb-2">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold">React Frontend</h3>
              <p className="text-center text-muted-foreground">
                Modern React frontend with TypeScript for building interactive user interfaces.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>TypeScript integration</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Component-based architecture</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Modern UI libraries</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-600/10 p-3 rounded-full mb-2">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">PostgreSQL & SQLModel</h3>
              <p className="text-center text-muted-foreground">
                Powerful database integration with SQLModel for type-safe database interactions.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Type-safe ORM</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Migrations with Alembic</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>PostgreSQL integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Tech Stack</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Comprehensive Technology Stack</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The template includes a carefully selected set of technologies for modern web development.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5 text-blue-600" />
                  Backend Technologies
                </CardTitle>
                <CardDescription>Core technologies for the backend API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-blue-600 text-white">FastAPI</Badge>
                    <span className="text-sm">Modern API framework</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-green-600 text-white">SQLModel</Badge>
                    <span className="text-sm">Type-safe ORM</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-orange-600 text-white">Pydantic</Badge>
                    <span className="text-sm">Data validation</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-purple-600 text-white">PostgreSQL</Badge>
                    <span className="text-sm">Relational database</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-yellow-600 text-white">Alembic</Badge>
                    <span className="text-sm">Database migrations</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-red-600 text-white">Pytest</Badge>
                    <span className="text-sm">Testing framework</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-purple-600" />
                  Frontend Technologies
                </CardTitle>
                <CardDescription>Core technologies for the frontend UI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-blue-600 text-white">React</Badge>
                    <span className="text-sm">UI library</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-cyan-600 text-white">TypeScript</Badge>
                    <span className="text-sm">Type safety</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-purple-600 text-white">Chakra UI</Badge>
                    <span className="text-sm">Component library</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-green-600 text-white">React Query</Badge>
                    <span className="text-sm">Data fetching</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-yellow-600 text-white">Jest</Badge>
                    <span className="text-sm">Testing framework</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-red-600 text-white">Vite</Badge>
                    <span className="text-sm">Build tool</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-orange-600" />
                  DevOps & Infrastructure
                </CardTitle>
                <CardDescription>Tools for deployment and infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-blue-600 text-white">Docker</Badge>
                    <span className="text-sm">Containerization</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-green-600 text-white">Docker Compose</Badge>
                    <span className="text-sm">Multi-container setup</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-purple-600 text-white">GitHub Actions</Badge>
                    <span className="text-sm">CI/CD</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-orange-600 text-white">Traefik</Badge>
                    <span className="text-sm">Reverse proxy</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-yellow-600 text-white">HTTPS</Badge>
                    <span className="text-sm">Automatic certificates</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Badge className="bg-red-600 text-white">Swagger</Badge>
                    <span className="text-sm">API documentation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Getting Started</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Start Building Your Application</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Follow these steps to get started with the FastAPI full-stack template.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-8">
            <Tabs defaultValue="docker" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="docker">Docker Setup</TabsTrigger>
                <TabsTrigger value="manual">Manual Setup</TabsTrigger>
              </TabsList>
              <TabsContent value="docker" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Docker Compose Setup</CardTitle>
                    <CardDescription>The easiest way to get started with the template</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">1. Clone the repository</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>git clone https://github.com/fastapi/full-stack-fastapi-template.git</pre>
                        <pre>cd full-stack-fastapi-template</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">2. Start the services</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>docker-compose up -d</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">3. Access the application</h3>
                      <p className="text-sm text-muted-foreground">
                        The backend API will be available at{" "}
                        <code className="text-blue-500">http://localhost:8000</code>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The frontend will be available at <code className="text-blue-500">http://localhost:3000</code>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        API documentation will be available at{" "}
                        <code className="text-blue-500">http://localhost:8000/docs</code>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="https://github.com/fastapi/full-stack-fastapi-template#docker-compose"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">
                        View Docker Documentation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="manual" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Setup</CardTitle>
                    <CardDescription>For more control over your development environment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">1. Clone the repository</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>git clone https://github.com/fastapi/full-stack-fastapi-template.git</pre>
                        <pre>cd full-stack-fastapi-template</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">2. Backend setup</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>cd backend</pre>
                        <pre>python -m venv venv</pre>
                        <pre>source venv/bin/activate # On Windows: venv\Scripts\activate</pre>
                        <pre>pip install -r requirements.txt</pre>
                        <pre>uvicorn app.main:app --reload</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">3. Frontend setup</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>cd frontend</pre>
                        <pre>npm install</pre>
                        <pre>npm run dev</pre>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="https://github.com/fastapi/full-stack-fastapi-template#manual-setup"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">
                        View Manual Setup Documentation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">AI Integration</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Integrate AI Models with FastAPI
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Enhance your application with AI capabilities using these pre-configured integrations.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl mt-8">
            <Tabs defaultValue="openai" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="openai">OpenAI</TabsTrigger>
                <TabsTrigger value="huggingface">Hugging Face</TabsTrigger>
                <TabsTrigger value="langchain">LangChain</TabsTrigger>
                <TabsTrigger value="custom">Custom Models</TabsTrigger>
              </TabsList>
              
              <TabsContent value="openai" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-green-600" />
                      OpenAI Integration
                    </CardTitle>
                    <CardDescription>Integrate OpenAI's GPT models with your FastAPI application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">1. Install dependencies</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>pip install openai python-dotenv</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">2. Create an OpenAI router</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`# app/api/routes/openai.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()

class CompletionRequest(BaseModel):
    prompt: str
    max_tokens: int = 100
    temperature: float = 0.7

class CompletionResponse(BaseModel):
    text: str
    
@router.post("/completions", response_model=CompletionResponse)
async def create_completion(request: CompletionRequest):
    try:
        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=request.prompt,
            max_tokens=request.max_tokens,
            temperature=request.temperature
        )
        return CompletionResponse(text=response.choices[0].text.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    temperature: float = 0.7

class ChatResponse(BaseModel):
    message: ChatMessage
    
@router.post("/chat", response_model=ChatResponse)
async def create_chat_completion(request: ChatRequest):
    try:
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages,
            temperature=request.temperature
        )
        assistant_message = response.choices[0].message
        return ChatResponse(
            message=ChatMessage(
                role=assistant_message.role,
                content=assistant_message.content
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">3. Include the router in your main app</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>{`# app/main.py
from fastapi import FastAPI
from app.api.routes import openai

app = FastAPI()

app.include_router(openai.router, prefix="/api/openai", tags=["openai"])
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">4. Set up environment variables</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>{`# .env
OPENAI_API_KEY=your_openai_api_key_here
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">5. Frontend integration example (React)</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`// src/components/AIChat.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/openai/chat', {
        messages: [
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: userMessage.role, content: userMessage.content }
        ]
      });

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response.data.message.content }
      ]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={\`mb-4 p-3 rounded-lg \${
              msg.role === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%]' 
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }\`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-[80%]">
            Thinking...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};
`}</pre>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="https://platform.openai.com/docs/api-reference" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        OpenAI API Documentation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="huggingface" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-yellow-600" />
                      Hugging Face Integration
                    </CardTitle>
                    <CardDescription>Integrate Hugging Face models with your FastAPI application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">1. Install dependencies</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>pip install transformers torch python-dotenv</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">2. Create a Hugging Face router</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`# app/api/routes/huggingface.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import torch
import os
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HUGGINGFACE_TOKEN")

router = APIRouter()

# Initialize sentiment analysis pipeline
sentiment_analyzer = pipeline("sentiment-analysis")

# Initialize text generation model
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    label: str
    score: float

@router.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    try:
        result = sentiment_analyzer(request.text)[0]
        return SentimentResponse(label=result["label"], score=result["score"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class GenerationRequest(BaseModel):
    prompt: str
    max_length: int = 100
    temperature: float = 0.7
    num_return_sequences: int = 1

class GenerationResponse(BaseModel):
    generated_texts: List[str]

@router.post("/generate", response_model=GenerationResponse)
async def generate_text(request: GenerationRequest):
    try:
        input_ids = tokenizer.encode(request.prompt, return_tensors="pt")
        
        # Generate text
        output = model.generate(
            input_ids,
            max_length=request.max_length,
            temperature=request.temperature,
            num_return_sequences=request.num_return_sequences,
            do_sample=True,
        )
        
        # Decode the generated output
        generated_texts = [tokenizer.decode(ids, skip_special_tokens=True) for ids in output]
        
        return GenerationResponse(generated_texts=generated_texts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">3. Include the router in your main app</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>{`# app/main.py
from fastapi import FastAPI
from app.api.routes import huggingface

app = FastAPI()

app.include_router(huggingface.router, prefix="/api/huggingface", tags=["huggingface"])
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">4. Frontend integration example (React)</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`// src/components/SentimentAnalyzer.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface SentimentResult {
  label: string;
  score: number;
}

export const SentimentAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/huggingface/sentiment', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block mb-2">
            Enter text to analyze:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={4}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-bold">Result:</h3>
          <p>Sentiment: {result.label}</p>
          <p>Confidence: {(result.score * 100).toFixed(2)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className={\`h-2.5 rounded-full \${
                result.label === 'POSITIVE' ? 'bg-green-600' : 'bg-red-600'
              }\`}
              style={{ width: \`\${result.score * 100}%\` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
`}</pre>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="https://huggingface.co/docs/transformers/index" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        Hugging Face Documentation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="langchain" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      LangChain Integration
                    </CardTitle>
                    <CardDescription>Build complex AI applications with LangChain and FastAPI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">1. Install dependencies</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>pip install langchain openai python-dotenv</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">2. Create a LangChain router</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`# app/api/routes/langchain_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
import os
from dotenv import load_dotenv

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

router = APIRouter()

# Initialize LLM
llm = OpenAI(temperature=0.7)

class ChainRequest(BaseModel):
    input_text: str
    template: str
    variables: List[str]

class ChainResponse(BaseModel):
    output: str

@router.post("/chain", response_model=ChainResponse)
async def run_chain(request: ChainRequest):
    try:
        # Create a prompt template
        prompt = PromptTemplate(
            input_variables=request.variables,
            template=request.template
        )
        
        # Create a chain
        chain = LLMChain(llm=llm, prompt=prompt)
        
        # Parse input variables from the request
        input_dict = {}
        for var in request.variables:
            input_dict[var] = request.input_text
        
        # Run the chain
        result = chain.run(input_dict)
        
        return ChainResponse(output=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str
    
@router.post("/chat", response_model=ChatResponse)
async def chat_with_memory(request: ChatRequest):
    try:
        # Initialize conversation with memory
        conversation = ConversationChain(
            llm=llm, 
            verbose=True,
            memory=ConversationBufferMemory()
        )
        
        # Process each message in the conversation
        for message in request.messages:
            if message.role == "user":
                response = conversation.predict(input=message.content)
        
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class QARequest(BaseModel):
    question: str
    context: str

class QAResponse(BaseModel):
    answer: str

@router.post("/qa", response_model=QAResponse)
async def question_answering(request: QARequest):
    try:
        # Create a prompt template for QA
        qa_template = """
        Context: {context}
        
        Question: {question}
        
        Answer:
        """
        
        prompt = PromptTemplate(
            input_variables=["context", "question"],
            template=qa_template
        )
        
        # Create a chain
        chain = LLMChain(llm=llm, prompt=prompt)
        
        # Run the chain
        result = chain.run(context=request.context, question=request.question)
        
        return QAResponse(answer=result.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">3. Include the router in your main app</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>{`# app/main.py
from fastapi import FastAPI
from app.api.routes import langchain_routes

app = FastAPI()

app.include_router(langchain_routes.router, prefix="/api/langchain", tags=["langchain"])
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">4. Frontend integration example (React)</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`// src/components/DocumentQA.tsx
import React, { useState } from 'react';
import axios from 'axios';

export const DocumentQA: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !context.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/langchain/qa', {
        question,
        context
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error getting answer:', error);
      setAnswer('An error occurred while processing your question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Document Question Answering</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="context" className="block mb-2">
            Document/Context:
          </label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={6}
            placeholder="Paste your document or context here..."
          />
        </div>
        <div>
          <label htmlFor="question" className="block mb-2">
            Your Question:
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Ask a question about the document..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Get Answer'}
        </button>
      </form>

      {answer && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-bold mb-2">Answer:</h3>
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
};
`}</pre>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="https://python.langchain.com/docs/get_started/introduction" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        LangChain Documentation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="custom" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                      Custom Model Integration
                    </CardTitle>
                    <CardDescription>Deploy and serve your own custom ML models with FastAPI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">1. Install dependencies</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>pip install scikit-learn joblib pandas numpy</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">2. Create a model service</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`# app/services/model_service.py
import joblib
import os
import numpy as np
from typing import List, Dict, Any, Union

class ModelService:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = self._load_model()
        
    def _load_model(self):
        """Load the ML model from disk."""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file not found at {self.model_path}")
        return joblib.load(self.model_path)
    
    def predict(self, features: List[float]) -> Dict[str, Any]:
        """Make a prediction using the loaded model."""
        try:
            features_array = np.array(features).reshape(1, -1)
            prediction = self.model.predict(features_array)
            probability = None
            
            # If the model supports probability estimation
            if hasattr(self.model, "predict_proba"):
                probability = self.model.predict_proba(features_array).tolist()
            
            return {
                "prediction": prediction.tolist(),
                "probability": probability
            }
        except Exception as e:
            return {"error": str(e)}
    
    def batch_predict(self, self, batch_features: List[List[float]]) -> Dict[str, Any]:
        """Make predictions for a batch of inputs."""
        try:
            features_array = np.array(batch_features)
            predictions = self.model.predict(features_array)
            probabilities = None
            
            # If the model supports probability estimation
            if hasattr(self.model, "predict_proba"):
                probabilities = self.model.predict_proba(features_array).tolist()
            
            return {
                "predictions": predictions.tolist(),
                "probabilities": probabilities
            }
        except Exception as e:
            return {"error": str(e)}
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">3. Create a custom model router</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white overflow-auto">
                        <pre>{`# app/api/routes/ml_model.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.services.model_service import ModelService
import os

router = APIRouter()

# Initialize model service
MODEL_PATH = os.getenv("MODEL_PATH", "app/models/model.joblib")
model_service = ModelService(MODEL_PATH)

class PredictionRequest(BaseModel):
    features: List[float]

class BatchPredictionRequest(BaseModel):
    batch_features: List[List[float]]

class PredictionResponse(BaseModel):
    prediction: List[int]
    probability: Optional[List[List[float]]] = None

class BatchPredictionResponse(BaseModel):
    predictions: List[int]
    probabilities: Optional[List[List[float]]] = None

@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        result = model_service.predict(request.features)
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/batch-predict", response_model=BatchPredictionResponse)
async def batch_predict(request: BatchPredictionRequest):
    try:
        result = model_service.batch_predict(request.batch_features)
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`}</pre>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">4. Include the router in your main app</h3>
                      <div className="rounded-md bg-black p-4 font-mono text-sm text-white">
                        <pre>{`# app/main.py
from fastapi import FastAPI
from app.api.routes import ml_model

app = FastAPI()

app.include_router(ml_model.router,
