"use client"

import { useState } from "react"
import { Terminal } from "@/components/terminal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Code, Play, Download, Upload, RefreshCw } from "lucide-react"

export function CLIDashboard() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTerminal, setActiveTerminal] = useState("dev")

  const terminals = {
    dev: {
      title: "Development Server",
      icon: <Play className="h-4 w-4 mr-2" />,
      command: "npm run dev",
      description: "Run the Next.js development server",
    },
    build: {
      title: "Build Project",
      icon: <RefreshCw className="h-4 w-4 mr-2" />,
      command: "npm run build",
      description: "Build the project for production",
    },
    install: {
      title: "Install Dependencies",
      icon: <Download className="h-4 w-4 mr-2" />,
      command: "npm install",
      description: "Install project dependencies",
    },
    deploy: {
      title: "Deploy Project",
      icon: <Upload className="h-4 w-4 mr-2" />,
      command: "vercel deploy",
      description: "Deploy the project to Vercel",
    },
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Terminal & CLI
          </CardTitle>
          <CardDescription>Run commands and manage your project from the terminal</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dev" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-gray-950 border border-gray-800">
                {Object.entries(terminals).map(([key, { title, icon }]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-gray-900"
                    onClick={() => setActiveTerminal(key)}
                  >
                    {icon}
                    {title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-800 bg-black hover:bg-gray-900"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </Button>
            </div>

            {Object.entries(terminals).map(([key, { command, description }]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <p className="text-sm text-gray-400 mb-2">{description}</p>
                <Terminal
                  defaultCommand={activeTerminal === key ? command : ""}
                  height="400px"
                  fullscreen={isFullscreen}
                  onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                  onClose={isFullscreen ? () => setIsFullscreen(false) : undefined}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
