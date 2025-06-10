import { Button } from "@/components/ui/button"
import { NewProjectButton } from "@/new-project-button"
import { Home, FolderOpen, Users, Settings, HelpCircle, LogOut, Code, Server, PlusCircle } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Super Developer</h2>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <NewProjectButton className="w-full justify-start" />
        <nav className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <a href="/dashboard/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Project
            </a>
          </Button>
          <Button variant="ghost" className="justify-start">
            <FolderOpen className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <a href="/dashboard/ide">
              <Code className="mr-2 h-4 w-4" />
              Code Editor
            </a>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <a href="/dashboard/cli">
              <Server className="mr-2 h-4 w-4" />
              Terminal & CLI
            </a>
          </Button>
          <Button variant="ghost" className="justify-start">
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
          <Button variant="ghost" className="justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>
      <div className="border-t p-4">
        <nav className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
          <Button variant="ghost" className="justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </nav>
      </div>
    </aside>
  )
}
