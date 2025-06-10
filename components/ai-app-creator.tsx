"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, FileCode, Database, Server, Check, Download, Wand2 } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"

// Remove the AI SDK imports that might be causing issues
// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"

interface AppComponent {
  name: string
  description: string
  code: string
  type: "frontend" | "backend" | "database"
}

export function AIAppCreator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedComponents, setGeneratedComponents] = useState<AppComponent[]>([])
  const [currentStep, setCurrentStep] = useState<"describe" | "review" | "customize">("describe")
  const [selectedComponent, setSelectedComponent] = useState<AppComponent | null>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)

  const examplePrompts = [
    "Create a blog website with a homepage, article listing, and article detail page",
    "Build a task management app with user authentication and the ability to create, edit, and delete tasks",
    "Make an e-commerce store with product listings, shopping cart, and checkout process",
    "Design a portfolio website with project showcase and contact form",
  ]

  const handleExampleClick = (example: string) => {
    setPrompt(example)
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }

  // Replace the generateApp function with this improved version that properly handles the simulation

  const generateApp = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setCurrentStep("describe")

    try {
      // Instead of simulating an API call with a timeout that might cause issues,
      // let's directly create the response data

      // Sample generated components
      const components: AppComponent[] = [
        {
          name: "HomePage",
          description: "Main landing page with hero section, features, and call to action",
          code: `"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl">MyApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to MyApp
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The easiest way to build your next project. Fast, reliable, and designed for modern web.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Everything you need to build amazing applications.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Feature 1</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Feature 2</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Feature 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 MyApp Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}`,
          type: "frontend",
        },
        {
          name: "API Routes",
          description: "Backend API routes for data fetching and manipulation",
          code: `// app/api/items/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In a real app, this would fetch from your database
    const items = [
      { id: 1, name: 'Item 1', description: 'Description for item 1' },
      { id: 2, name: 'Item 2', description: 'Description for item 2' },
      { id: 3, name: 'Item 3', description: 'Description for item 3' },
    ]
    
    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    
    // In a real app, this would save to your database
    // const item = await db.item.create({ data: json })
    
    const newItem = {
      id: 4,
      name: json.name,
      description: json.description
    }
    
    return NextResponse.json({ item: newItem }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}`,
          type: "backend",
        },
        {
          name: "Database Schema",
          description: "Prisma schema for the application database",
          code: `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  items     Item[]
}

model Item {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}`,
          type: "database",
        },
      ]

      // Set the generated components directly without using setTimeout
      setGeneratedComponents(components)
      setCurrentStep("review")
    } catch (error) {
      console.error("Error generating app:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleComponentSelect = (component: AppComponent) => {
    setSelectedComponent(component)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "describe":
        return (
          <div className="space-y-4">
            <Textarea
              ref={promptRef}
              placeholder="Describe the app you want to build in natural language..."
              className="min-h-[200px] text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Try one of these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, index) => (
                  <Button key={index} variant="outline" size="sm" onClick={() => handleExampleClick(example)}>
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )
      case "review":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedComponents.map((component, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer hover:border-primary transition-colors ${selectedComponent?.name === component.name ? "border-primary" : ""}`}
                  onClick={() => handleComponentSelect(component)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{component.name}</CardTitle>
                      <Badge
                        variant={
                          component.type === "frontend"
                            ? "default"
                            : component.type === "backend"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {component.type}
                      </Badge>
                    </div>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedComponent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {selectedComponent.type === "frontend" ? (
                      <FileCode className="h-5 w-5 mr-2" />
                    ) : selectedComponent.type === "backend" ? (
                      <Server className="h-5 w-5 mr-2" />
                    ) : (
                      <Database className="h-5 w-5 mr-2" />
                    )}
                    {selectedComponent.name}
                  </CardTitle>
                  <CardDescription>{selectedComponent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeEditor defaultLanguage="typescript" defaultValue={selectedComponent.code} height="400px" />
                </CardContent>
              </Card>
            )}
          </div>
        )
      case "customize":
        return (
          <div>
            <p>Customize your app</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          AI App Creator
        </CardTitle>
        <CardDescription>Describe your app in natural language and let AI generate the code</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="describe" value={currentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="describe" disabled={isGenerating}>
              1. Describe
            </TabsTrigger>
            <TabsTrigger value="review" disabled={generatedComponents.length === 0 || isGenerating}>
              2. Review
            </TabsTrigger>
            <TabsTrigger value="customize" disabled={true}>
              3. Customize
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">{renderStepContent()}</div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        {currentStep === "describe" ? (
          <>
            <Button variant="outline" disabled={isGenerating}>
              Cancel
            </Button>
            <Button onClick={generateApp} disabled={!prompt.trim() || isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate App
                </>
              )}
            </Button>
          </>
        ) : currentStep === "review" ? (
          <>
            <Button variant="outline" onClick={() => setCurrentStep("describe")}>
              Back
            </Button>
            <Button onClick={() => setCurrentStep("customize")} disabled={!selectedComponent}>
              <Download className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setCurrentStep("review")}>
              Back
            </Button>
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Finish
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
