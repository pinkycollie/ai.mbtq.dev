import { NewProjectButton } from "@/components/new-project-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Clock, Users, ArrowUpRight, PlusCircle, Code } from "lucide-react"

// Sample project data
const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "A modern e-commerce solution with integrated payment processing",
    lastUpdated: "2 hours ago",
    members: 4,
  },
  {
    id: 2,
    name: "Analytics Dashboard",
    description: "Real-time data visualization and reporting tools",
    lastUpdated: "Yesterday",
    members: 3,
  },
  {
    id: 3,
    name: "Mobile App",
    description: "Cross-platform mobile application with React Native",
    lastUpdated: "3 days ago",
    members: 5,
  },
]

export function ProjectsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Projects</h2>
        <NewProjectButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 min-h-[40px]">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {project.lastUpdated}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  {project.members}
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">Open project</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {/* New Project Card */}
        <Card className="flex flex-col items-center justify-center p-6 border-dashed">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Create a new project</h3>
              <p className="text-sm text-muted-foreground">Start building your next great idea</p>
            </div>
            <NewProjectButton variant="secondary" />
          </div>
        </Card>

        {/* IDE Card */}
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-blue-500/10 p-3">
              <Code className="h-6 w-6 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Code Editor</h3>
              <p className="text-sm text-muted-foreground">Edit your code directly in the browser</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/dashboard/ide">Open Editor</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
