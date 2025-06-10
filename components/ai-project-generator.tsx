"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Sparkles, FileCode, Check, Download, Wand2, Code, Braces, Layers, X } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { VercelTerminal } from "@/components/vercel-terminal"

interface ProjectFile {
  name: string
  path: string
  content: string
  language: string
}

interface ProjectStructure {
  name: string
  description: string
  files: ProjectFile[]
  dependencies: string[]
  devDependencies: string[]
  scripts: Record<string, string>
}

export function AIProjectGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProject, setGeneratedProject] = useState<ProjectStructure | null>(null)
  const [currentStep, setCurrentStep] = useState<"describe" | "configure" | "generate" | "deploy">("describe")
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null)
  const [projectName, setProjectName] = useState("")
  const [framework, setFramework] = useState("nextjs")
  const [includeAPI, setIncludeAPI] = useState(true)
  const [includeDatabase, setIncludeDatabase] = useState(true)
  const [includeAuth, setIncludeAuth] = useState(true)
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "success" | "error">("idle")
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

  const generateProject = async () => {
    if (!prompt.trim() || !projectName.trim()) return

    setIsGenerating(true)
    setCurrentStep("generate")

    try {
      // Simulate project generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Sample generated project
      const project: ProjectStructure = {
        name: projectName,
        description: prompt,
        dependencies: [
          "next",
          "react",
          "react-dom",
          "tailwindcss",
          ...(includeAPI ? ["axios"] : []),
          ...(includeDatabase ? ["prisma", "@prisma/client"] : []),
          ...(includeAuth ? ["next-auth"] : []),
        ],
        devDependencies: ["typescript", "@types/react", "@types/node", "eslint"],
        scripts: {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "next lint",
        },
        files: [
          {
            name: "page.tsx",
            path: "app/page.tsx",
            language: "typescript",
            content: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">Welcome to ${projectName}</h1>
        <p className="text-xl mb-8">${prompt}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Next.js App Router</li>
              <li>Tailwind CSS</li>
              ${includeAPI ? "<li>API Routes</li>" : ""}
              ${includeDatabase ? "<li>Database Integration</li>" : ""}
              ${includeAuth ? "<li>Authentication</li>" : ""}
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
            <p>Edit this page in app/page.tsx</p>
          </div>
        </div>
      </div>
    </main>
  )
}`,
          },
          {
            name: "layout.tsx",
            path: "app/layout.tsx",
            language: "typescript",
            content: `import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '${projectName}',
  description: '${prompt}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`,
          },
          {
            name: "globals.css",
            path: "app/globals.css",
            language: "css",
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`,
          },
          ...(includeAPI
            ? [
                {
                  name: "route.ts",
                  path: "app/api/items/route.ts",
                  language: "typescript",
                  content: `import { NextResponse } from 'next/server'

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
                },
              ]
            : []),
          ...(includeDatabase
            ? [
                {
                  name: "schema.prisma",
                  path: "prisma/schema.prisma",
                  language: "prisma",
                  content: `generator client {
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
                },
              ]
            : []),
          ...(includeAuth
            ? [
                {
                  name: "auth.ts",
                  path: "app/api/auth/[...nextauth]/route.ts",
                  language: "typescript",
                  content: `import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // In a real app, you would verify the credentials against your database
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "User", email: "user@example.com" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
})
`,
                },
              ]
            : []),
        ],
      }

      setGeneratedProject(project)
      setSelectedFile(project.files[0])
    } catch (error) {
      console.error("Error generating project:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileSelect = (file: ProjectFile) => {
    setSelectedFile(file)
  }

  const handleDeploy = async () => {
    if (!generatedProject) return

    setDeploymentStatus("deploying")

    try {
      // Simulate deployment
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setDeploymentStatus("success")
      setCurrentStep("deploy")
    } catch (error) {
      console.error("Error deploying project:", error)
      setDeploymentStatus("error")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "describe":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="my-awesome-project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <Textarea
              ref={promptRef}
              placeholder="Describe the project you want to build in natural language..."
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

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Project Configuration</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework">Framework</Label>
                    <Select value={framework} onValueChange={setFramework}>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="svelte">SvelteKit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-routes">API Routes</Label>
                      <p className="text-sm text-muted-foreground">Include API routes for backend functionality</p>
                    </div>
                    <Switch id="api-routes" checked={includeAPI} onCheckedChange={setIncludeAPI} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="database">Database</Label>
                      <p className="text-sm text-muted-foreground">Include database schema and connections</p>
                    </div>
                    <Switch id="database" checked={includeDatabase} onCheckedChange={setIncludeDatabase} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auth">Authentication</Label>
                      <p className="text-sm text-muted-foreground">Include user authentication</p>
                    </div>
                    <Switch id="auth" checked={includeAuth} onCheckedChange={setIncludeAuth} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "generate":
        return (
          <div className="space-y-6">
            {generatedProject ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Files</CardTitle>
                      </CardHeader>
                      <CardContent className="max-h-[400px] overflow-y-auto">
                        <div className="space-y-1">
                          {generatedProject.files.map((file) => (
                            <Button
                              key={file.path}
                              variant="ghost"
                              className={`w-full justify-start text-sm ${selectedFile?.path === file.path ? "bg-muted" : ""}`}
                              onClick={() => handleFileSelect(file)}
                            >
                              <FileCode className="h-4 w-4 mr-2" />
                              {file.path}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">Dependencies</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {generatedProject.dependencies.map((dep) => (
                                <Badge key={dep} variant="outline">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium">Dev Dependencies</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {generatedProject.devDependencies.map((dep) => (
                                <Badge key={dep} variant="outline">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium">Scripts</h3>
                            <div className="space-y-2 mt-2">
                              {Object.entries(generatedProject.scripts).map(([name, script]) => (
                                <div key={name} className="text-sm">
                                  <span className="font-mono text-primary">{name}:</span> {script}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    {selectedFile && (
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle>{selectedFile.path}</CardTitle>
                          <Badge>{selectedFile.language}</Badge>
                        </CardHeader>
                        <CardContent>
                          <CodeEditor
                            defaultLanguage={selectedFile.language}
                            defaultValue={selectedFile.content}
                            height="400px"
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Terminal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VercelTerminal height="200px" />
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Generating your project</h3>
                <p className="text-muted-foreground">This may take a moment...</p>
              </div>
            )}
          </div>
        )
      case "deploy":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  {deploymentStatus === "deploying" ? (
                    <>
                      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Deploying your project</h3>
                      <p className="text-muted-foreground">This may take a moment...</p>
                    </>
                  ) : deploymentStatus === "success" ? (
                    <>
                      <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mb-4">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Deployment Successful!</h3>
                      <p className="text-muted-foreground mb-4">Your project is now live at:</p>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm mb-6">
                        https://{projectName.toLowerCase().replace(/\s+/g, "-")}.vercel.app
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline">View Project</Button>
                        <Button>Open Dashboard</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full mb-4">
                        <X className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Deployment Failed</h3>
                      <p className="text-muted-foreground mb-4">There was an error deploying your project.</p>
                      <Button onClick={() => handleDeploy()}>Try Again</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <VercelTerminal height="200px" defaultCommand="vercel deploy" />
              </CardContent>
            </Card>
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
          AI Project Generator
        </CardTitle>
        <CardDescription>Describe your project and let AI generate the code and structure</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="describe" value={currentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="describe" disabled={isGenerating}>
              <Braces className="h-4 w-4 mr-2" />
              1. Describe
            </TabsTrigger>
            <TabsTrigger value="generate" disabled={!generatedProject || isGenerating}>
              <Code className="h-4 w-4 mr-2" />
              2. Generate
            </TabsTrigger>
            <TabsTrigger value="deploy" disabled={!generatedProject || deploymentStatus === "idle"}>
              <Layers className="h-4 w-4 mr-2" />
              3. Deploy
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
            <Button onClick={generateProject} disabled={!prompt.trim() || !projectName.trim() || isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Project
                </>
              )}
            </Button>
          </>
        ) : currentStep === "generate" ? (
          <>
            <Button variant="outline" onClick={() => setCurrentStep("describe")} disabled={isGenerating}>
              Back
            </Button>
            <Button
              onClick={handleDeploy}
              disabled={!generatedProject || isGenerating || deploymentStatus === "deploying"}
            >
              <Download className="mr-2 h-4 w-4" />
              Deploy Project
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setCurrentStep("generate")}>
              Back to Project
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
