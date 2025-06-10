"use client"

import { PlatformSidebar } from "@/components/platform-sidebar"
import { AIAppCreator } from "@/components/ai-app-creator"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function AICreatorPage() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Add error handling for the page
    const handleError = () => {
      setHasError(true)
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (hasError) {
    return (
      <>
        <PlatformSidebar />
        <div className="flex-1 overflow-auto">
          <div className="border-b">
            <div className="flex h-16 items-center px-6">
              <h1 className="text-lg font-semibold">AI App Creator</h1>
            </div>
          </div>
          <div className="p-6">
            <Card className="border-red-200">
              <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                <p className="text-muted-foreground mb-4">We encountered an error loading the AI App Creator</p>
                <Button onClick={() => window.location.reload()} className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PlatformSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-semibold">AI App Creator</h1>
          </div>
        </div>
        <div className="p-6">
          <AIAppCreator />
        </div>
      </div>
    </>
  )
}
