"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  Check,
  AlertCircle,
  Clock,
  RotateCw,
  Globe,
  Server,
  Zap,
} from "lucide-react"

const deployments = [
  {
    id: "dep-1",
    environment: "production",
    branch: "main",
    commit: "a1b2c3d",
    status: "success",
    url: "https://my-app.vercel.app",
    createdAt: "2 hours ago",
    duration: "45s",
  },
  {
    id: "dep-2",
    environment: "preview",
    branch: "feature/new-ui",
    commit: "e4f5g6h",
    status: "success",
    url: "https://feature-new-ui.vercel.app",
    createdAt: "5 hours ago",
    duration: "42s",
  },
  {
    id: "dep-3",
    environment: "preview",
    branch: "fix/auth-issue",
    commit: "i7j8k9l",
    status: "error",
    url: "https://fix-auth-issue.vercel.app",
    createdAt: "1 day ago",
    duration: "38s",
  },
]

const buildSteps = [
  { name: "Installing dependencies", status: "complete", duration: "12s" },
  { name: "Running tests", status: "complete", duration: "8s" },
  { name: "Building application", status: "complete", duration: "18s" },
  { name: "Running post-build checks", status: "complete", duration: "5s" },
  { name: "Deploying to Vercel", status: "complete", duration: "2s" },
]

export function DeploymentPipeline() {
  const [activeDeployment, setActiveDeployment] = useState(deployments[0])

  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="h-5 w-5 mr-2" />
          Deployment Pipeline
        </CardTitle>
        <CardDescription>Manage your deployments and view build logs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="deployments" className="w-full">
          <TabsList className="bg-gray-950 border border-gray-800 w-full">
            <TabsTrigger value="deployments" className="flex-1 data-[state=active]:bg-gray-900">
              Recent Deployments
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex-1 data-[state=active]:bg-gray-900">
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex-1 data-[state=active]:bg-gray-900">
              Build Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deployments" className="mt-4 space-y-4">
            <div className="space-y-4">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className={`rounded-lg border ${activeDeployment.id === deployment.id ? "border-blue-600" : "border-gray-800"} bg-black p-4 cursor-pointer hover:border-gray-700 transition-colors`}
                  onClick={() => setActiveDeployment(deployment)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {deployment.status === "success" ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <div>
                        <h3 className="font-medium">{deployment.url}</h3>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <GitBranch className="h-3 w-3 mr-1" />
                          {deployment.branch}
                          <span className="mx-2">•</span>
                          <GitCommit className="h-3 w-3 mr-1" />
                          {deployment.commit}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          deployment.environment === "production"
                            ? "bg-green-950/30 text-green-400 border-green-800"
                            : "bg-blue-950/30 text-blue-400 border-blue-800"
                        }
                      `}
                    >
                      {deployment.environment}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {deployment.createdAt}
                    </div>
                    <div>Duration: {deployment.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="mt-4">
            <div className="rounded-lg border border-gray-800 bg-black p-4 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Build and Deployment Pipeline</h3>

                <div className="space-y-4">
                  {buildSteps.map((step, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{step.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{step.duration}</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium">Deployment Successful</span>
                  </div>
                  <Badge variant="outline" className="bg-green-950/30 text-green-400 border-green-800">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  Total Duration: {activeDeployment.duration}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <div className="rounded-lg border border-gray-800 bg-black p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Build Logs</h3>
                <Button variant="outline" size="sm" className="h-8 border-gray-800 bg-black hover:bg-gray-900">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="bg-gray-950 p-4 rounded-md font-mono text-xs text-gray-300 h-80 overflow-auto">
                <div className="text-green-400">$ vercel deploy</div>
                <div className="mt-2">Vercel CLI 28.15.3</div>
                <div className="mt-2 text-gray-400">
                  &gt; Retrieving project settings
                  <br />
                  &gt; Detected Next.js application
                  <br />
                  &gt; Installing dependencies...
                  <br />
                  &gt; Using Node.js 18.x
                  <br />
                  &gt; Installing dependencies with pnpm
                  <br />
                  &gt; Installed dependencies
                  <br />
                  &gt; Running "vercel build"
                  <br />
                  &gt; Running build command...
                  <br />
                  &gt; Next.js build started
                  <br />
                  &gt; Collecting page data...
                  <br />
                  &gt; Generating static pages (0/10)
                  <br />
                  &gt; Generating static pages (10/10)
                  <br />
                  &gt; Finalizing page optimization...
                  <br />
                  &gt; Build completed
                  <br />
                  &gt; Uploading build outputs...
                  <br />
                  &gt; Deploying build outputs...
                  <br />
                  &gt; Deployment complete!
                </div>
                <div className="mt-2 text-green-400">✅ Production: https://my-app.vercel.app [45s]</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
          <GitPullRequest className="mr-2 h-4 w-4" />
          View Git History
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
            <Globe className="mr-2 h-4 w-4" />
            Visit Site
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Zap className="mr-2 h-4 w-4" />
            Deploy
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
