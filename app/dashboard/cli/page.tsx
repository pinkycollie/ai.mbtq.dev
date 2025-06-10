import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { CLIDashboard } from "@/components/cli-dashboard"
import { FastAPIIntegration } from "@/components/fastapi-integration"

export default function CLIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Terminal & CLI</h1>
            <p className="text-muted-foreground">Run commands and manage your project from the terminal</p>
          </div>
          <div className="space-y-6">
            <CLIDashboard />
            <FastAPIIntegration />
          </div>
        </main>
      </div>
    </div>
  )
}
