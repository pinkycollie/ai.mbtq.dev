"use client"

import { PlatformSidebar } from "@/components/platform-sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VercelTerminal } from "@/components/vercel-terminal"
import {
  BarChart3,
  Code,
  Database,
  GitBranch,
  Globe,
  PlusCircle,
  Server,
  Terminal,
  Zap,
  ArrowRight,
  Clock,
  ArrowUpRight,
  Sparkles,
  Braces,
  Check,
} from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  // Add this near the top of the component, with other state variables
  const [activeTab, setActiveTab] = useState("projects")

  return (
    <>
      <PlatformSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Projects</CardTitle>
                <CardDescription>Your development projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">Active projects</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between text-primary">
                  View all projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Deployments</CardTitle>
                <CardDescription>Your project deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Total deployments</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between text-primary">
                  View deployments
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">FastAPI Services</CardTitle>
                <CardDescription>Your Python backend services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">Active services</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between text-primary">
                  View services
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-200/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                  AI App Creator
                </CardTitle>
                <CardDescription>Build apps with natural language</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Describe your app in natural language and let AI generate the code</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Generate full-stack applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Customize and edit generated code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Deploy directly to Vercel</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-primary"
                  onClick={() => (window.location.href = "/ai-creator")}
                >
                  Try AI App Creator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border-purple-200/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Braces className="h-5 w-5 mr-2 text-purple-500" />
                  AI Project Generator
                </CardTitle>
                <CardDescription>Generate complete project structures</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Create fully-structured projects with all the files you need</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Next.js, React, and more frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Database and API integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">One-click deployment</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-primary"
                  onClick={() => (window.location.href = "/ai-project-generator")}
                >
                  Try AI Project Generator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="projects" className="flex-1" onClick={() => setActiveTab("projects")}>
                Recent Projects
              </TabsTrigger>
              <TabsTrigger value="deployments" className="flex-1" onClick={() => setActiveTab("deployments")}>
                Recent Deployments
              </TabsTrigger>
              <TabsTrigger value="terminal" className="flex-1" onClick={() => setActiveTab("terminal")}>
                Quick Terminal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">E-commerce Platform</CardTitle>
                      <Badge>Next.js</Badge>
                    </div>
                    <CardDescription className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Updated 2 hours ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Next.js e-commerce platform with product catalog and checkout
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Code className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">Admin Dashboard</CardTitle>
                      <Badge variant="secondary">Next.js + FastAPI</Badge>
                    </div>
                    <CardDescription className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Updated 3 days ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Admin dashboard with user management and analytics</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Code className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <PlusCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Create a new project</h3>
                      <p className="text-sm text-muted-foreground">Start building your next great idea</p>
                    </div>
                    <Button>Create Project</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="deployments" className="mt-4">
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
            </TabsContent>

            <TabsContent value="terminal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2" />
                    Quick Terminal
                  </CardTitle>
                  <CardDescription>Run commands and manage your projects from the terminal</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Only render the terminal when this tab is active */}
                  {activeTab === "terminal" && <VercelTerminal height="300px" />}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between text-primary">
                    Open full console
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vercel Ecosystem</CardTitle>
                <CardDescription>Integrated services and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="bg-blue-500/10 p-2 rounded-md">
                      <Database className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Vercel KV</h3>
                      <p className="text-xs text-muted-foreground">Redis database</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="bg-purple-500/10 p-2 rounded-md">
                      <Database className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Vercel Postgres</h3>
                      <p className="text-xs text-muted-foreground">SQL database</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="bg-green-500/10 p-2 rounded-md">
                      <Server className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Vercel Blob</h3>
                      <p className="text-xs text-muted-foreground">File storage</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="bg-orange-500/10 p-2 rounded-md">
                      <Zap className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Vercel AI SDK</h3>
                      <p className="text-xs text-muted-foreground">AI integration</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore All Integrations
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FastAPI Integration</CardTitle>
                <CardDescription>Python backend services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-full">
                      <Server className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">Integrate Python FastAPI with Next.js:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Full-stack development with Python and TypeScript
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          RESTful API endpoints with automatic documentation
                        </li>
                        <li className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Seamless deployment on Vercel
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create FastAPI Project</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
