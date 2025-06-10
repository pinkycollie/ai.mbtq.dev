"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Code, FileCode, Braces, Terminal, Zap, AlertCircle, Check, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AIPipelineProps {
  initialModel?: string
  initialPrompt?: string
}

export function AIPipeline({ initialModel = "gpt-4o", initialPrompt = "" }: AIPipelineProps) {
  // State for AI pipeline
  const [model, setModel] = useState(initialModel)
  const [prompt, setPrompt] = useState(initialPrompt)
  const [systemPrompt, setSystemPrompt] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("prompt")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [statusMessages, setStatusMessages] = useState<
    {
      id: number
      type: "success" | "error" | "info" | "warning"
      message: string
      timestamp: Date
    }[]
  >([])
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [visualFeedback, setVisualFeedback] = useState<{
    show: boolean
    type: "success" | "error" | "info" | "warning"
    message: string
  }>({ show: false, type: "info", message: "" })

  const outputRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Models available in the platform
  const availableModels = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
    { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
    { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta" },
    { id: "mistral-large", name: "Mistral Large", provider: "Mistral AI" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  ]

  // Example prompts
  const examplePrompts = [
    "Create a React component for a user profile card with accessibility features for deaf users",
    "Write a FastAPI endpoint that returns real-time data with visual notifications",
    "Generate a Next.js page with keyboard navigation and visual feedback mechanisms",
    "Create a deployment script that provides visual status updates instead of audio cues",
  ]

  // Function to show visual feedback
  const showFeedback = (type: "success" | "error" | "info" | "warning", message: string) => {
    setVisualFeedback({ type, message, show: true })

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setVisualFeedback({ type: null, message: "", show: false })
    }, 5000)
  }

  // Function to add status message with visual indicator
  const addStatusMessage = (message: string) => {
    setStatusMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "info",
        message: message,
        timestamp: new Date(),
      },
    ])

    // Scroll to bottom of status messages
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    }, 100)
  }

  // Simulate AI generation with visual feedback
  const generateContent = async () => {
    if (!prompt.trim()) {
      showFeedback("warning", "Please enter a prompt before generating")
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setGeneratedContent("")
    setStatusMessages([])
    setHasError(false)
    setErrorMessage("")
    setActiveTab("output")

    try {
      // Add initial status messages
      addStatusMessage(`Starting generation with model: ${model}`)
      addStatusMessage("Preparing prompt and parameters...")

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 300)

      // Simulate API call with visual feedback
      addStatusMessage("Sending request to AI model...")

      // In a real implementation, this would be an actual API call
      // const response = await apiClient.post("/api/ai/generate", {
      //   model,
      //   prompt,
      //   systemPrompt: systemPrompt || undefined,
      //   temperature,
      //   maxTokens
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      addStatusMessage("Processing response...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate sample content based on the model
      const result = `// Generated content based on your prompt:
// "${prompt}"

// Here's a sample implementation that focuses on visual feedback for deaf developers

import { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

// Visual status indicator component that replaces audio cues
function VisualStatusIndicator({ status, message }) {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      case 'loading': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-md border">
      <div className={\`h-3 w-3 rounded-full \${getStatusColor()}\`} />
      <span className="font-medium">{message}</span>
    </div>
  );
}

// Main component with visual feedback mechanisms
export default function DeafFirstComponent() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef(null);

  // Add a visual notification instead of playing a sound
  const addNotification = (type, content) => {
    const newNotification = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-scroll to the latest notification
    setTimeout(() => {
      if (notificationsRef.current) {
        notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
      }
    }, 100);
  };

  // Simulate a process with visual feedback
  const startProcess = () => {
    setStatus('loading');
    setMessage('Process started');
    setProgress(0);
    addNotification('info', 'Process initiated');
    
    // Visual progress updates instead of audio cues
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        
        // Add visual notifications at key points
        if (newProgress === 30) {
          addNotification('info', '30% complete - Processing data');
        } else if (newProgress === 60) {
          addNotification('warning', '60% complete - Validating results');
        } else if (newProgress === 90) {
          addNotification('info', '90% complete - Finalizing');
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setStatus('success');
          setMessage('Process completed successfully');
          addNotification('success', 'Process completed successfully');
          return 100;
        }
        return newProgress;
      });
    }, 500);
    
    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <h2 className="text-2xl font-bold">Deaf-First Development Interface</h2>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Current Status:</span>
          <VisualStatusIndicator status={status} message={message} />
        </div>
        
        {status === 'loading' && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">Visual Notifications</h3>
        <div 
          className="h-40 overflow-y-auto border rounded-md p-2 space-y-2"
          ref={notificationsRef}
        >
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center">No notifications yet</p>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={\`p-2 rounded-md \${
                  notification.type === 'success' ? 'bg-green-100 border-green-300' :
                  notification.type === 'error' ? 'bg-red-100 border-red-300' :
                  notification.type === 'warning' ? 'bg-yellow-100 border-yellow-300' :
                  'bg-blue-100 border-blue-300'
                }\`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{notification.type}</span>
                  <span className="text-xs">{notification.timestamp}</span>
                </div>
                <p>{notification.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={startProcess}
          disabled={status === 'loading'}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Process with Visual Feedback
        </button>
        
        <button
          onClick={() => {
            setStatus('idle');
            setMessage('');
            setProgress(0);
            setNotifications([]);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`
      clearInterval(progressInterval)
      setProgress(100)

      // Set generated content
      setGeneratedContent(result)
      addStatusMessage("Generation completed successfully!")
      showFeedback("success", "Content generated successfully")

      // Show toast with visual indicator
      toast({
        title: "Generation Complete",
        description: "AI has successfully generated content based on your prompt",
        variant: "default",
      })
    } catch (error) {
      console.error("Error generating content:", error)
      setHasError(true)
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred")
      showFeedback("error", "Failed to generate content")
      addStatusMessage("Error: Failed to generate content")

      // Show toast with visual indicator
      toast({
        title: "Generation Failed",
        description: "There was an error generating content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle example prompt click
  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  // Reset the form
  const handleReset = () => {
    setPrompt("")
    setSystemPrompt("")
    setTemperature(0.7)
    setMaxTokens(1000)
    setGeneratedContent("")
    setStatusMessages([])
    setHasError(false)
    setErrorMessage("")
    setActiveTab("prompt")
  }

  // Copy generated content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    toast({
      title: "Copied to clipboard",
      description: "Generated content has been copied to clipboard",
    })
    showFeedback("success", "Copied to clipboard")
  }

  // Add this inside the AIPipeline component, before the return statement
  const sampleContent = `// Sample React component generated by AI
import React from 'react';

function SampleComponent() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>This is a sample React component generated by AI.</p>
    </div>
  );
}

export default SampleComponent;`

  useEffect(() => {
    if (!generatedContent && !prompt && !isGenerating) {
      setGeneratedContent(sampleContent)
      setPrompt("Generate a simple React component")
    }
  }, [generatedContent, prompt, isGenerating])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Pipeline
          <Badge variant="outline" className="ml-2">
            Deaf-First
          </Badge>
        </CardTitle>
        <CardDescription>
          Generate code, content, and more with AI models - with visual feedback for deaf developers
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Visual feedback alert */}
        {visualFeedback.show && (
          <Alert variant={visualFeedback.type === "error" ? "destructive" : "default"} className="animate-pulse">
            {visualFeedback.type === "error" && <AlertCircle className="h-4 w-4" />}
            {visualFeedback.type === "success" && <Check className="h-4 w-4" />}
            {visualFeedback.type === "info" && <Code className="h-4 w-4" />}
            {visualFeedback.type === "warning" && <AlertCircle className="h-4 w-4" />}
            <AlertTitle>
              {visualFeedback.type === "error"
                ? "Error"
                : visualFeedback.type === "success"
                  ? "Success"
                  : visualFeedback.type === "warning"
                    ? "Warning"
                    : "Information"}
            </AlertTitle>
            <AlertDescription>{visualFeedback.message}</AlertDescription>
          </Alert>
        )}

        {/* Model selection */}
        <div className="space-y-2">
          <Label htmlFor="model">AI Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs for prompt, output, and status */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prompt" data-testid="prompt-tab">
              <Code className="h-4 w-4 mr-2" />
              Prompt
            </TabsTrigger>
            <TabsTrigger value="output" data-testid="output-tab">
              <FileCode className="h-4 w-4 mr-2" />
              Output
            </TabsTrigger>
            <TabsTrigger value="status" data-testid="status-tab">
              <Terminal className="h-4 w-4 mr-2" />
              Status
              {statusMessages.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {statusMessages.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Prompt tab */}
          <TabsContent value="prompt" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want to generate..."
                className="min-h-[200px] font-mono"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Example prompts */}
            <div className="space-y-2">
              <Label>Example Prompts</Label>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, index) => (
                  <Button key={index} variant="outline" size="sm" onClick={() => handleExampleClick(example)}>
                    {example.length > 30 ? example.substring(0, 30) + "..." : example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Advanced options */}
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-advanced">Advanced Options</Label>
                <Switch id="show-advanced" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">System Prompt (Optional)</Label>
                    <Textarea
                      id="system-prompt"
                      placeholder="Instructions for the AI model..."
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature: {temperature}</Label>
                      <input
                        id="temperature"
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Lower values produce more focused, deterministic outputs. Higher values produce more creative,
                        varied outputs.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
                      <input
                        id="max-tokens"
                        type="number"
                        min="100"
                        max="4000"
                        step="100"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(Number.parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum number of tokens to generate. Higher values allow for longer outputs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Output tab */}
          <TabsContent value="output" className="space-y-4 pt-4">
            {isGenerating ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Generating Content...</Label>
                  <span className="text-sm">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center animate-pulse">
                  Please wait while the AI generates your content
                </p>
              </div>
            ) : generatedContent ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Generated Content</Label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    Copy to Clipboard
                  </Button>
                </div>
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted overflow-auto max-h-[500px] font-mono text-sm">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Braces className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Content Generated Yet</h3>
                <p className="text-muted-foreground mt-2">Enter a prompt and click "Generate" to create content</p>
              </div>
            )}
          </TabsContent>

          {/* Status tab */}
          <TabsContent value="status" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Status Messages</Label>
              <div
                ref={outputRef}
                className="p-4 rounded-md bg-muted overflow-auto max-h-[300px] font-mono text-sm"
                tabIndex={0}
                role="log"
                aria-live="polite"
              >
                {statusMessages.length > 0 ? (
                  statusMessages.map((message, index) => (
                    <div key={index} className="py-1 border-b border-border last:border-0">
                      <span className="text-muted-foreground">[{message.timestamp.toLocaleTimeString()}]</span>{" "}
                      {message.message}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center">No status messages yet</p>
                )}
              </div>
            </div>

            {hasError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={handleReset} disabled={isGenerating}>
          <X className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={generateContent} disabled={isGenerating || !prompt.trim()}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
