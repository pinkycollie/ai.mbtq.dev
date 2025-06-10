import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { IDE } from "@/components/ide"

export default function IDEPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Code Editor</h1>
            <p className="text-muted-foreground">Edit your project files directly in the browser</p>
          </div>
          <div className="h-[80vh]">
            <IDE />
          </div>
        </main>
      </div>
    </div>
  )
}
