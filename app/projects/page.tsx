"use client"

import { PlatformSidebar } from "@/components/platform-sidebar"
import { ProjectTemplates } from "@/components/project-templates"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, GitBranch, Clock, ArrowUpRight, Server, FileCode } from "lucide-react"

// Sample project data
const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Next.js e-commerce platform with product catalog and checkout",
    type: "Next.js",
    lastUpdated: "2 hours ago",
    url: "https://e-commerce-platform.vercel.app",
  },
  {
    id: "2",
    name: "Marketing Website",
    description: "Company marketing website with blog and contact form",
    type: "Next.js",
    lastUpdated: "1 day ago",
    url: "https://marketing-website.vercel.app",
  },
  {
    id: "3",
    name: "Admin Dashboard",
    description: "Admin dashboard with user management and analytics",
    type: "Next.js + FastAPI",
    lastUpdated: "3 days ago",
    url: "https://admin-dashboard.vercel.app",
  },
  {
    id: "4",
    name: "Mobile App Backend",
    description: "FastAPI backend for mobile application",
    type: "FastAPI",
    lastUpdated: "1 week ago",
    url: "https://mobile-app-backend.vercel.app",
  },
]

export default function ProjectsPage() {
  return (
    <>
      <PlatformSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-semibold">Projects</h1>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="nextjs">Next.js</TabsTrigger>
                <TabsTrigger value="fastapi">FastAPI</TabsTrigger>
                <TabsTrigger value="fullstack">Full-Stack</TabsTrigger>
              </TabsList>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                        <Badge variant={project.type.includes("FastAPI") ? "secondary" : "default"}>
                          {project.type}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {project.lastUpdated}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <GitBranch className="mr-2 h-4 w-4" />
                        Deployments
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Open
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

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

            <TabsContent value="nextjs" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.type.includes("Next.js"))
                  .map((project) => (
                    <Card key={project.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                          <Badge>{project.type}</Badge>
                        </div>
                        <CardDescription className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.lastUpdated}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <GitBranch className="mr-2 h-4 w-4" />
                          Deployments
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Open
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="fastapi" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.type.includes("FastAPI"))
                  .map((project) => (
                    <Card key={project.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                          <Badge variant="secondary">{project.type}</Badge>
                        </div>
                        <CardDescription className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.lastUpdated}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Server className="mr-2 h-4 w-4" />
                          API
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Open
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="fullstack" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.type.includes("+"))
                  .map((project) => (
                    <Card key={project.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                          <Badge variant="secondary">{project.type}</Badge>
                        </div>
                        <CardDescription className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.lastUpdated}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <FileCode className="mr-2 h-4 w-4" />
                          Frontend
                        </Button>
                        <Button variant="outline" size="sm">
                          <Server className="mr-2 h-4 w-4" />
                          Backend
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <ProjectTemplates />
        </div>
      </div>
    </>
  )
}
