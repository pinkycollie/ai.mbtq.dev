"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Loader2, Rocket, Code, Wallet } from "lucide-react"

export function SimpleProjectCreator() {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [template, setTemplate] = useState("")
  const [includeWeb3, setIncludeWeb3] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const templates = [
    { id: "nextjs", name: "Next.js App", description: "Full-stack React framework" },
    { id: "react", name: "React SPA", description: "Single page application" },
    { id: "web3-app", name: "Web3 App", description: "Thirdweb + Next.js" },
    { id: "nft-marketplace", name: "NFT Marketplace", description: "Ready-to-use marketplace" },
  ]

  const handleCreate = async () => {
    setIsCreating(true)

    // Simulate project creation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsCreating(false)

    // Reset form
    setProjectName("")
    setDescription("")
    setTemplate("")
    setIncludeWeb3(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Create New Project
        </CardTitle>
        <CardDescription>Set up a new project with your preferred template and tools</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            placeholder="my-awesome-project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of your project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Choose a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((tmpl) => (
                <SelectItem key={tmpl.id} value={tmpl.id}>
                  <div>
                    <div className="font-medium">{tmpl.name}</div>
                    <div className="text-sm text-muted-foreground">{tmpl.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="web3">Include Web3 Features</Label>
            <div className="text-sm text-muted-foreground">Add Thirdweb SDK and wallet connection</div>
          </div>
          <Switch id="web3" checked={includeWeb3} onCheckedChange={setIncludeWeb3} />
        </div>

        {includeWeb3 && (
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4" />
              <span className="font-medium">Web3 Features</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Wallet Connect</Badge>
              <Badge variant="outline">Smart Contracts</Badge>
              <Badge variant="outline">NFT Support</Badge>
              <Badge variant="outline">Token Management</Badge>
            </div>
          </div>
        )}

        <Button onClick={handleCreate} disabled={!projectName || !template || isCreating} className="w-full">
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Project...
            </>
          ) : (
            <>
              <Rocket className="mr-2 h-4 w-4" />
              Create Project
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
