"use client"

import { useState } from "react"
import {
  Search,
  Code,
  Users,
  Settings,
  Zap,
  Database,
  Cloud,
  PlusCircle,
  ChevronDown,
  Layers,
  Cpu,
  Boxes,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarInput,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Sample data
const projects = [
  { id: "1", name: "E-commerce Platform", client: "Self", type: "Next.js" },
  { id: "2", name: "Social Media App", client: "Client A", type: "React" },
  { id: "3", name: "Streaming Service", client: "Client B", type: "Next.js" },
  { id: "4", name: "Portfolio Site", client: "Self", type: "Astro" },
]

const clients = [
  { id: "1", name: "Self" },
  { id: "2", name: "Client A" },
  { id: "3", name: "Client B" },
]

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sidebar variant="sidebar" className="border-r border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter">SUPER DEVELOPER</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <SidebarInput
            placeholder="Search projects or clients..."
            className="pl-9 bg-gray-900 border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Projects
                </span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredProjects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton asChild>
                        <a href={`/projects/${project.id}`}>
                          <Code className="h-4 w-4" />
                          <span>{project.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/projects/new" className="text-blue-400">
                        <PlusCircle className="h-4 w-4" />
                        <span>New Project</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Clients
                </span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {clients
                    .filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((client) => (
                      <SidebarMenuItem key={client.id}>
                        <SidebarMenuButton asChild>
                          <a href={`/clients/${client.id}`}>
                            <span>{client.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/clients/new" className="text-blue-400">
                        <PlusCircle className="h-4 w-4" />
                        <span>New Client</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/ai-assistant">
                    <Cpu className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/prompt-library">
                    <Boxes className="h-4 w-4" />
                    <span>Prompt Library</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/database">
                    <Database className="h-4 w-4" />
                    <span>Database</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/deployments">
                    <Cloud className="h-4 w-4" />
                    <span>Deployments</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 flex items-center gap-3 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Super Developer</span>
            <span className="text-xs text-gray-400">Free Plan</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
