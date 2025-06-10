"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  GitBranch,
  Check,
  AlertCircle,
  Clock,
  Server,
  Zap,
  Loader2,
  Terminal,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DeploymentStep {
  id: string
  name: string
  status: "pending" | "in-progress" | "complete" | "failed"
  duration?: string
  startTime?: Date
  endTime?: Date
  logs: string[]
}

interface DeploymentConfig {
  name: string
  environment: "production" | "preview" | "development"
  branch: string
  framework: string
  buildCommand: string
  outputDirectory: string
  installCommand: string
  nodeVersion: string
  deploymentPlatform: "vercel" | "replit" | "kraken"
}

export function DeafFirstDeployment() {
  // State for deployment
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    { id: "setup", name: "Setting up deployment", status: "pending", logs: [] },
    { id: "install", name: "Installing dependencies", status: "pending", logs: [] },
    { id: "build", name: "Building application", status: "pending", logs: [] },
    { id: "test", name: "Running tests", status: "pending", logs: [] },
    { id: "deploy", name: "Deploying to platform", status: "pending", logs: [] },
  ])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    name: "super-developer-platform",
    environment: "preview",
    branch: "main",
    framework: "next",
    buildCommand: "next build",
    outputDirectory: ".next",
    installCommand: "npm install",
    nodeVersion: "18.x",
    deploymentPlatform: "vercel",
  })
  const [overallProgress, setOverallProgress] = useState(0)
  const [deploymentResult, setDeploymentResult] = useState<{
    success: boolean
    url?: string
    error?: string
    duration?: string
  } | null>(null)
  const [showVisualAlerts, setShowVisualAlerts] = useState(true)
  const [activeTab, setActiveTab] = useState("config")
  const [visualAlert, setVisualAlert] = useState<{
    show: boolean
    type: "success" | "error" | "info" | "warning"
    message: string
  }>({ show: false, type: "info", message: "" })

  const logsEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Function to show visual alert
  const showAlert = (type: "success" | "error" | "info" | "warning", message: string) => {
    if (!showVisualAlerts) return

    setVisualAlert({
      show: true,
      type,
      message,
    })

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setVisualAlert((prev) => ({ ...prev, show: false }))
    }, 5000)
  }

  // Function to add log to current step
  const addLog = (stepId: string, log: string) => {
    setDeploymentSteps((steps) =>
      steps.map((step) => (step.id === stepId ? { ...step, logs: [...step.logs, log] } : step)),
    )

    // Scroll to bottom of logs
    setTimeout(() => {
      if (logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  // Function to update step status
  const updateStepStatus = (
    stepId: string,
    status: "pending" | "in-progress" | "complete" | "failed",
    duration?: string,
  ) => {
    setDeploymentSteps((steps) =>
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              status,
              duration,
              ...(status === "in-progress" ? { startTime: new Date() } : {}),
              ...(status === "complete" || status === "failed" ? { endTime: new Date() } : {}),
            }
          : step,
      ),
    )
  }

  // Function to start deployment
  const startDeployment = async () => {
    // Reset previous deployment
    setIsDeploying(true)
    setCurrentStepIndex(-1)
    setOverallProgress(0)
    setDeploymentResult(null)
    setActiveTab("logs")

    // Reset steps
    setDeploymentSteps((steps) =>
      steps.map((step) => ({ ...step, status: "pending", logs: [], startTime: undefined, endTime: undefined })),
    )

    // Show visual alert
    showAlert("info", "Deployment started")

    // Start deployment process
    await runDeploymentSteps()
  }

  // Function to run deployment steps
  const runDeploymentSteps = async () => {
    const steps = [...deploymentSteps]
    const startTime = new Date()

    try {
      // Step 1: Setup
      setCurrentStepIndex(0)
      updateStepStatus("setup", "in-progress")
      addLog("setup", `Setting up deployment for ${deploymentConfig.name}`)
      addLog("setup", `Environment: ${deploymentConfig.environment}`)
      addLog("setup", `Branch: ${deploymentConfig.branch}`)
      addLog("setup", `Platform: ${deploymentConfig.deploymentPlatform}`)

      // Simulate setup process
      await new Promise((resolve) => setTimeout(resolve, 1500))
      addLog("setup", "Deployment setup completed")
      updateStepStatus("setup", "complete", "1.5s")
      setOverallProgress(20)

      // Step 2: Install dependencies
      setCurrentStepIndex(1)
      updateStepStatus("install", "in-progress")
      addLog("install", `Running: ${deploymentConfig.installCommand}`)

      // Simulate installation process with multiple logs
      await new Promise((resolve) => setTimeout(resolve, 800))
      addLog("install", "Installing packages...")
      await new Promise((resolve) => setTimeout(resolve, 1200))
      addLog("install", "Resolving dependencies...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addLog("install", "Packages installed successfully")
      updateStepStatus("install", "complete", "3.0s")
      setOverallProgress(40)

      // Step 3: Build
      setCurrentStepIndex(2)
      updateStepStatus("build", "in-progress")
      addLog("build", `Running: ${deploymentConfig.buildCommand}`)

      // Simulate build process
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addLog("build", "Compiling...")
      await new Promise((resolve) => setTimeout(resolve, 1500))
      addLog("build", "Optimizing...")
      await new Promise((resolve) => setTimeout(resolve, 1200))
      addLog("build", "Build completed successfully")
      updateStepStatus("build", "complete", "3.7s")
      setOverallProgress(60)

      // Step 4: Test
      setCurrentStepIndex(3)
      updateStepStatus("test", "in-progress")
      addLog("test", "Running tests...")

      // Simulate test process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      addLog("test", "All tests passed")
      updateStepStatus("test", "complete", "2.0s")
      setOverallProgress(80)

      // Step 5: Deploy
      setCurrentStepIndex(4)
      updateStepStatus("deploy", "in-progress")
      addLog("deploy", `Deploying to ${deploymentConfig.deploymentPlatform}...`)

      // Simulate deployment process
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addLog("deploy", "Uploading build artifacts...")
      await new Promise((resolve) => setTimeout(resolve, 1500))
      addLog("deploy", "Configuring environment...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Deployment success
      addLog("deploy", "Deployment completed successfully")
      updateStepStatus("deploy", "complete", "3.5s")
      setOverallProgress(100)

      // Calculate total duration
      const endTime = new Date()
      const totalDuration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(1)

      // Set deployment result
      setDeploymentResult({
        success: true,
        url: `https://${deploymentConfig.name}-git-${deploymentConfig.branch}-username.${deploymentConfig.deploymentPlatform}.app`,
        duration: `${totalDuration}s`,
      })

      // Show visual alert
      showAlert("success", "Deployment completed successfully")

      // Show toast with visual indicator
      toast({
        title: "Deployment Successful",
        description: "Your application has been deployed successfully",
        variant: "default",
      })
    } catch (error) {
      // Handle deployment failure
      const currentStep = deploymentSteps[currentStepIndex]
      updateStepStatus(currentStep.id, "failed")
      addLog(currentStep.id, `Error: ${error instanceof Error ? error.message : "Unknown error"}`)

      // Set deployment result
      setDeploymentResult({
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred during deployment",
      })

      // Show visual alert
      showAlert("error", "Deployment failed")

      // Show toast with visual indicator
      toast({
        title: "Deployment Failed",
        description: "There was an error during deployment. Please check the logs.",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  // Function to get step status icon
  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      case "in-progress":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  useEffect(() => {
    if (!isDeploying && !deploymentResult) {
      // Simulate a successful deployment
      setDeploymentResult({
        success: true,
        url: "https://super-developer-platform.vercel.app",
        duration: "45s",
      })
    }
  }, [isDeploying, deploymentResult])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Deaf-First Deployment Pipeline
          <Badge variant="outline" className="ml-2">
            Visual Feedback
          </Badge>
        </CardTitle>
        <CardDescription>Deploy your application with visual status updates and feedback</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Visual alert */}
        {visualAlert.show && (
          <Alert variant={visualAlert.type === "error" ? "destructive" : "default"} className="animate-pulse">
            {visualAlert.type === "error" && <AlertCircle className="h-4 w-4" />}
            {visualAlert.type === "success" && <Check className="h-4 w-4" />}
            {visualAlert.type === "info" && <Server className="h-4 w-4" />}
            {visualAlert.type === "warning" && <AlertCircle className="h-4 w-4" />}
            <AlertTitle>
              {visualAlert.type === "error"
                ? "Error"
                : visualAlert.type === "success"
                  ? "Success"
                  : visualAlert.type === "warning"
                    ? "Warning"
                    : "Information"}
            </AlertTitle>
            <AlertDescription>{visualAlert.message}</AlertDescription>
          </Alert>
        )}

        {/* Deployment progress */}
        {isDeploying && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Deployment Progress</span>
              <span className="text-sm">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        )}

        {/* Deployment result */}
        {deploymentResult && (
          <Alert variant={deploymentResult.success ? "default" : "destructive"}>
            {deploymentResult.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{deploymentResult.success ? "Deployment Successful" : "Deployment Failed"}</AlertTitle>
            <AlertDescription>
              {deploymentResult.success ? (
                <div className="space-y-2">
                  <p>Your application has been deployed successfully in {deploymentResult.duration}</p>
                  <p className="font-medium">
                    URL:{" "}
                    <a href={deploymentResult.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {deploymentResult.url}
                    </a>
                  </p>
                </div>
              ) : (
                <p>{deploymentResult.error}</p>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs for configuration, logs, and steps */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">
              <Server className="h-4 w-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Terminal className="h-4 w-4 mr-2" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="steps">
              <GitBranch className="h-4 w-4 mr-2" />
              Steps
            </TabsTrigger>
          </TabsList>

          {/* Configuration tab */}
          <TabsContent value="config" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <input
                  id="name"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  value={deploymentConfig.name}
                  onChange={(e) => setDeploymentConfig({ ...deploymentConfig, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Git Branch</Label>
                <input
                  id="branch"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  value={deploymentConfig.branch}
                  onChange={(e) => setDeploymentConfig({ ...deploymentConfig, branch: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select
                  value={deploymentConfig.environment}
                  onValueChange={(value: "production" | "preview" | "development") =>
                    setDeploymentConfig({ ...deploymentConfig, environment: value })
                  }
                >
                  <SelectTrigger id="environment">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="preview">Preview</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Deployment Platform</Label>
                <Select
                  value={deploymentConfig.deploymentPlatform}
                  onValueChange={(value: "vercel" | "replit" | "kraken") =>
                    setDeploymentConfig({ ...deploymentConfig, deploymentPlatform: value })
                  }
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vercel">Vercel</SelectItem>
                    <SelectItem value="replit">Replit</SelectItem>
                    <SelectItem value="kraken">Kraken</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select
                  value={deploymentConfig.framework}
                  onValueChange={(value) => setDeploymentConfig({ ...deploymentConfig, framework: value })}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="svelte">SvelteKit</SelectItem>
                    <SelectItem value="fastapi">FastAPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="node-version">Node.js Version</Label>
                <Select
                  value={deploymentConfig.nodeVersion}
                  onValueChange={(value) => setDeploymentConfig({ ...deploymentConfig, nodeVersion: value })}
                >
                  <SelectTrigger id="node-version">
                    <SelectValue placeholder="Select Node.js version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18.x">18.x (LTS)</SelectItem>
                    <SelectItem value="20.x">20.x (LTS)</SelectItem>
                    <SelectItem value="21.x">21.x (Current)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="install-command">Install Command</Label>
                  <input
                    id="install-command"
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={deploymentConfig.installCommand}
                    onChange={(e) => setDeploymentConfig({ ...deploymentConfig, installCommand: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="build-command">Build Command</Label>
                  <input
                    id="build-command"
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={deploymentConfig.buildCommand}
                    onChange={(e) => setDeploymentConfig({ ...deploymentConfig, buildCommand: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="output-directory">Output Directory</Label>
                  <input
                    id="output-directory"
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={deploymentConfig.outputDirectory}
                    onChange={(e) => setDeploymentConfig({ ...deploymentConfig, outputDirectory: e.target.value })}
                  />
                </div>

                <div className="space-y-2 flex items-center">
                  <div className="flex-1">
                    <Label htmlFor="visual-alerts" className="block mb-2">
                      Visual Alerts
                    </Label>
                    <div className="text-xs text-muted-foreground">Show visual alerts for deployment events</div>
                  </div>
                  <Switch id="visual-alerts" checked={showVisualAlerts} onCheckedChange={setShowVisualAlerts} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Logs tab */}
          <TabsContent value="logs" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Deployment Logs</Label>
                {currentStepIndex >= 0 && currentStepIndex < deploymentSteps.length && (
                  <Badge variant="outline">{deploymentSteps[currentStepIndex].name}</Badge>
                )}
              </div>
              <div
                className="p-4 rounded-md bg-black text-white font-mono text-sm overflow-auto h-[300px]"
                role="log"
                aria-live="polite"
              >
                {deploymentSteps.flatMap((step, stepIndex) =>
                  step.logs.map((log, logIndex) => (
                    <div
                      key={`${stepIndex}-${logIndex}`}
                      className={`py-1 ${stepIndex === currentStepIndex ? "text-white" : "text-gray-400"}`}
                    >
                      <span className="text-gray-500">[{step.name}]</span> {log}
                    </div>
                  )),
                )}
                <div ref={logsEndRef} />

                {/* Show blinking cursor when deploying */}
                {isDeploying && <div className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></div>}

                {/* Show empty state when no logs */}
                {deploymentSteps.every((step) => step.logs.length === 0) && (
                  <div className="text-gray-500 text-center py-4">
                    No deployment logs yet. Start a deployment to see logs here.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Steps tab */}
          <TabsContent value="steps" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Deployment Steps</Label>
              <div className="space-y-2">
                {deploymentSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-md border ${
                      step.status === "in-progress"
                        ? "border-blue-500 bg-blue-500/10"
                        : step.status === "complete"
                          ? "border-green-500 bg-green-500/10"
                          : step.status === "failed"
                            ? "border-red-500 bg-red-500/10"
                            : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">{getStepStatusIcon(step.status)}</div>
                        <div>
                          <h3 className="font-medium">{step.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {step.status === "pending"
                              ? "Waiting to start"
                              : step.status === "in-progress"
                                ? "In progress..."
                                : step.status === "complete"
                                  ? `Completed in ${step.duration}`
                                  : "Failed"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          step.status === "pending"
                            ? "outline"
                            : step.status === "in-progress"
                              ? "secondary"
                              : step.status === "complete"
                                ? "default"
                                : "destructive"
                        }
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => setActiveTab("config")} disabled={isDeploying}>
          <Server className="mr-2 h-4 w-4" />
          Configure
        </Button>
        <Button onClick={startDeployment} disabled={isDeploying}>
          {isDeploying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Deploy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
