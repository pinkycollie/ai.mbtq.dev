"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket, CheckCircle, AlertCircle, ExternalLink, Github } from "lucide-react"

export function VercelDeploy() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [deploymentUrl, setDeploymentUrl] = useState("")
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "success" | "error">("idle")

  const handleDeploy = async () => {
    setIsDeploying(true)
    setDeploymentStatus("deploying")
    setDeployProgress(0)

    // Simulate deployment progress
    const interval = setInterval(() => {
      setDeployProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDeploying(false)
          setDeploymentStatus("success")
          setDeploymentUrl("https://my-project-abc123.vercel.app")
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Deploy to Vercel
        </CardTitle>
        <CardDescription>Deploy your project to Vercel with one click</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Info */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Github className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-medium">my-awesome-project</h3>
              <p className="text-sm text-muted-foreground">main branch</p>
            </div>
          </div>
          <Badge variant="outline">Next.js</Badge>
        </div>

        {/* Deployment Progress */}
        {isDeploying && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Deploying...</span>
              <span>{deployProgress}%</span>
            </div>
            <Progress value={deployProgress} />
          </div>
        )}

        {/* Deployment Result */}
        {deploymentStatus === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p>Deployment successful!</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Live at:</span>
                  <a
                    href={deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {deploymentUrl}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {deploymentStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Deployment failed. Please check your project configuration.</AlertDescription>
          </Alert>
        )}

        {/* Deploy Button */}
        <Button onClick={handleDeploy} disabled={isDeploying} className="w-full">
          {isDeploying ? "Deploying..." : "Deploy to Vercel"}
        </Button>

        {/* Recent Deployments */}
        <div className="space-y-2">
          <h4 className="font-medium">Recent Deployments</h4>
          <div className="space-y-2">
            {[
              { id: 1, status: "success", url: "https://my-project-abc123.vercel.app", time: "2 hours ago" },
              { id: 2, status: "success", url: "https://my-project-def456.vercel.app", time: "1 day ago" },
            ].map((deployment) => (
              <div key={deployment.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{deployment.time}</span>
                </div>
                <a
                  href={deployment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  View
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
