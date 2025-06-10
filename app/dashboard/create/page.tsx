import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { ProjectTemplates } from "@/components/project-templates"
import { DeploymentPipeline } from "@/components/deployment-pipeline"

export default function CreateProjectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Create New Project</h1>
            <p className="text-muted-foreground">Start a new project with a template or from scratch</p>
          </div>
          <div className="space-y-6">
            <ProjectTemplates />
            <DeploymentPipeline />
          </div>
        </main>
      </div>
    </div>
  )
}
