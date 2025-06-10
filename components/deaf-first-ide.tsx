"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CodeEditor } from "./code-editor"
import { FileExplorer, sampleFiles } from "./file-explorer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, Terminal, Bug, Save, Copy, Keyboard, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export function DeafFirstIDE() {
  const [selectedFile, setSelectedFile] = useState(sampleFiles[0].children?.[0].children?.[0])
  const [openTabs, setOpenTabs] = useState([selectedFile])
  const [activeTab, setActiveTab] = useState(selectedFile?.id)
  const [isRunning, setIsRunning] = useState(false)
  const [isDebugging, setIsDebugging] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [terminalVisible, setTerminalVisible] = useState(false)
  const [visualAlert, setVisualAlert] = useState<{
    show: boolean
    type: "success" | "error" | "info" | "warning"
    message: string
  }>({ show: false, type: "info", message: "" })
  const [statusMessages, setStatusMessages] = useState<
    {
      id: number
      type: "success" | "error" | "info" | "warning"
      message: string
      timestamp: Date
    }[]
  >([])
  const [keyboardShortcutsVisible, setKeyboardShortcutsVisible] = useState(false)

  const statusBarRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Function to show visual alert
  const showAlert = (type: "success" | "error" | "info" | "warning", message: string) => {
    setVisualAlert({
      show: true,
      type,
      message,
    })

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setVisualAlert({ show: false, type: "info", message: "" })
    }, 5000)
  }

  // Function to add status message
  const addStatusMessage = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    setStatusMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        message,
        timestamp: new Date(),
      },
    ])

    // Scroll to bottom of status messages
    setTimeout(() => {
      if (statusBarRef.current) {
        statusBarRef.current.scrollTop = statusBarRef.current.scrollHeight
      }
    }, 100)
  }

  const handleFileSelect = (file: any) => {
    if (file.type === "file") {
      setSelectedFile(file)

      if (!openTabs.find((tab) => tab?.id === file.id)) {
        setOpenTabs([...openTabs, file])
      }

      setActiveTab(file.id)
    }
  }

  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newTabs = openTabs.filter((tab) => tab?.id !== tabId)
    setOpenTabs(newTabs)

    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]?.id)
      setSelectedFile(newTabs[newTabs.length - 1])
    }
  }

  const handleRun = () => {
    setIsRunning(true)
    addStatusMessage("Running project...", "info")
    showAlert("info", "Running project...")

    setTimeout(() => {
      setIsRunning(false)
      addStatusMessage("Project ran successfully!", "success")
      showAlert("success", "Project ran successfully!")
    }, 2000)
  }

  const handleDebug = () => {
    setIsDebugging(true)
    addStatusMessage("Debugging project...", "info")
    showAlert("info", "Debugging project...")

    setTimeout(() => {
      setIsDebugging(false)
      addStatusMessage("Debugging complete!", "success")
      showAlert("success", "Debugging complete!")
    }, 2000)
  }

  const handleSave = () => {
    setIsSaving(true)
    addStatusMessage("Saving project...", "info")
    showAlert("info", "Saving project...")

    setTimeout(() => {
      setIsSaving(false)
      addStatusMessage("Project saved successfully!", "success")
      showAlert("success", "Project saved successfully!")
    }, 1500)
  }

  const handleCopyToClipboard = () => {
    if (selectedFile?.content) {
      navigator.clipboard.writeText(selectedFile.content)
      toast({
        title: "Copied to clipboard",
        description: "File content has been copied to clipboard",
      })
      showAlert("success", "File content copied to clipboard")
    } else {
      toast({
        title: "Nothing to copy",
        description: "No file selected or file content is empty",
        variant: "destructive",
      })
      showAlert("warning", "No file selected or file content is empty")
    }
  }

  const handleToggleTerminal = () => {
    setTerminalVisible(!terminalVisible)
    addStatusMessage(`Terminal ${terminalVisible ? "hidden" : "visible"}`, "info")
    showAlert("info", `Terminal ${terminalVisible ? "hidden" : "visible"}`)
  }

  const handleToggleKeyboardShortcuts = () => {
    setKeyboardShortcutsVisible(!keyboardShortcutsVisible)
    addStatusMessage(`Keyboard shortcuts ${keyboardShortcutsVisible ? "hidden" : "visible"}`, "info")
    showAlert("info", `Keyboard shortcuts ${keyboardShortcutsVisible ? "hidden" : "visible"}`)
  }

  useEffect(() => {
    // Set a default selected file
    if (!selectedFile) {
      setSelectedFile(sampleFiles[0].children?.[0].children?.[0])
    }
  }, [selectedFile])

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden bg-background">
      {/* Visual Alert */}
      {visualAlert.show && (
        <Alert variant={visualAlert.type === "error" ? "destructive" : "default"} className="animate-pulse">
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

      {/* Project Editor Header */}
      <div className="flex items-center justify-between p-2 border-b bg-muted/30">
        <h2 className="text-sm font-medium">Project Editor</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
            <VisuallyHidden>Save the current file</VisuallyHidden>
          </Button>
          <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={handleDebug} disabled={isDebugging}>
            <Bug className="h-4 w-4" />
            Debug
            <VisuallyHidden>Debug the current project</VisuallyHidden>
          </Button>
          <Button size="sm" variant="default" className="h-8 gap-1" onClick={handleRun} disabled={isRunning}>
            <Play className="h-4 w-4" />
            Run
            <VisuallyHidden>Run the current project</VisuallyHidden>
          </Button>
        </div>
      </div>

      {/* Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer files={sampleFiles} onFileSelect={handleFileSelect} selectedFileId={selectedFile?.id} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="border-b">
              <Tabs value={activeTab} className="w-full">
                <TabsList className="w-full justify-start h-10 p-0 bg-transparent">
                  {openTabs.map((tab) => (
                    <TabsTrigger
                      key={tab?.id}
                      value={tab?.id}
                      onClick={() => {
                        setActiveTab(tab?.id)
                        setSelectedFile(tab)
                      }}
                      className="relative h-10 px-4 data-[state=active]:bg-background rounded-none border-r"
                    >
                      {tab?.name}
                      <button
                        onClick={(e) => handleTabClose(tab?.id, e)}
                        className="ml-2 rounded-full hover:bg-muted p-0.5"
                        aria-label={`Close ${tab?.name}`}
                      >
                        ×
                      </button>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {openTabs.map((tab) => (
                  <TabsContent key={tab?.id} value={tab?.id} className="h-[calc(100%-2.5rem)] m-0 p-0">
                    <CodeEditor
                      defaultLanguage={tab?.language || "typescript"}
                      defaultValue={tab?.content || "// Empty file"}
                      height="calc(70vh - 6rem)"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Terminal */}
            {terminalVisible && (
              <div className="h-[30vh] border-t">
                <div className="flex items-center px-4 py-1 border-b bg-muted/30">
                  <Terminal className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Terminal</span>
                </div>
                <div className="p-2 font-mono text-sm h-[calc(30vh-2rem)] bg-black text-white overflow-auto">
                  <div className="text-green-400">$ npm run dev</div>
                  <div className="text-gray-400 mt-1">
                    ready - started server on 0.0.0.0:3000, url: http://localhost:3000
                    <br />
                    event - compiled client and server successfully in 188 ms (17 modules)
                    <br />
                    wait - compiling...
                    <br />
                    event - compiled successfully
                    <br />
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-blue-400">$</span>
                    <span className="ml-1 animate-pulse">|</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status Bar */}
      <div
        ref={statusBarRef}
        className="flex items-center justify-between p-2 border-t bg-muted/30 text-sm overflow-x-auto"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-center gap-2">
          {/* Status Messages */}
          {statusMessages.map((status, index) => (
            <div key={status.id} className="flex items-center gap-1">
              <span className="text-muted-foreground">[{status.timestamp.toLocaleTimeString()}]</span>
              <span>{status.message}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} aria-label="Copy to clipboard">
            <Copy className="h-4 w-4" />
            <VisuallyHidden>Copy to clipboard</VisuallyHidden>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleToggleTerminal} aria-pressed={terminalVisible}>
            <Terminal className="h-4 w-4" />
            <VisuallyHidden>{terminalVisible ? "Hide Terminal" : "Show Terminal"}</VisuallyHidden>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleKeyboardShortcuts}
            aria-pressed={keyboardShortcutsVisible}
          >
            <Keyboard className="h-4 w-4" />
            <VisuallyHidden>
              {keyboardShortcutsVisible ? "Hide Keyboard Shortcuts" : "Show Keyboard Shortcuts"}
            </VisuallyHidden>
          </Button>
        </div>
      </div>
    </div>
  )
}
