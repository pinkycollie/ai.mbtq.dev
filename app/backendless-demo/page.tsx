"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Database, Upload } from "lucide-react"
import { KeyboardNavigation } from "@/components/keyboard-navigation"
import { useVisualNotification } from "@/components/visual-notification-provider"

export default function BackendlessDemoPage() {
  const [activeTab, setActiveTab] = useState("auth")
  const { info } = useVisualNotification()

  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: "1",
      modifier: null,
      description: "Go to Authentication tab",
      action: () => setActiveTab("auth"),
    },
    {
      key: "2",
      modifier: null,
      description: "Go to Data Management tab",
      action: () => setActiveTab("data"),
    },
    {
      key: "3",
      modifier: null,
      description: "Go to File Storage tab",
      action: () => setActiveTab("files"),
    },
  ]

  // Show keyboard shortcuts tip on mount
  useEffect(() => {
    info({
      title: "Keyboard Shortcuts Available",
      message: "Press '?' to view available keyboard shortcuts or use numbers 1-3 to switch tabs",
      duration: 8000,
    })
  }, [info])

  // Handle tab key navigation
  const handleTabKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      if (activeTab === "auth") setActiveTab("data")
      else if (activeTab === "data") setActiveTab("files")
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      if (activeTab === "files") setActiveTab("data")
      else if (activeTab === "data") setActiveTab("auth")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <KeyboardNavigation shortcuts={shortcuts} showHelpOnStart={true} />
      
      <h1 className="text-3xl font-bold mb-8 text-center" tabIndex={0}>
        Backendless Integration Demo
      </h1>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full max-w-4xl mx-auto"
        aria-label="Backendless features"
      >
        <TabsList 
          className="grid w-full grid-cols-3" 
          aria-label="Backendless features tabs"
          onKeyDown={handleTabKeyNavigation}
        >
          <TabsTrigger 
            value="auth" 
            className="flex items-center gap-2"
            aria-controls="auth-tab"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            <span>Authentication</span>
          </TabsTrigger>
          <TabsTrigger 
            value="data" 
            className="flex items-center gap-2"
            aria-controls="data-tab"
          >
            <Database className="h-4 w-4" aria-hidden="true" />
            <span>Data Management</span>
          </TabsTrigger>
          <TabsTrigger 
            value="files" 
            className="flex items-center gap-2"
            aria-controls="files-tab"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            <span>File Storage</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="auth" id="auth-tab" role="tabpanel" tabIndex={0}>
            <Card>
              <CardHeader>
                <CardTitle>User Authentication</CardTitle>
                <CardDescription>Register, login, and manage user accounts with Backendless</CardDescription>
              </CardHeader

\
Let's update the VercelTerminal component to be fully accessible:
