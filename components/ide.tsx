"use client"

import type React from "react"

import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { FileExplorer, sampleFiles } from "./file-explorer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, Terminal, Bug, Save } from "lucide-react"

export function IDE() {
  const [selectedFile, setSelectedFile] = useState(sampleFiles[0].children?.[0].children?.[0])
  const [openTabs, setOpenTabs] = useState([selectedFile])
  const [activeTab, setActiveTab] = useState(selectedFile?.id)

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

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden bg-background">
      <div className="flex items-center justify-between p-2 border-b bg-muted/30">
        <h2 className="text-sm font-medium">Project Editor</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 gap-1">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button size="sm" variant="ghost" className="h-8 gap-1">
            <Bug className="h-4 w-4" />
            Debug
          </Button>
          <Button size="sm" variant="default" className="h-8 gap-1">
            <Play className="h-4 w-4" />
            Run
          </Button>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer files={sampleFiles} onFileSelect={handleFileSelect} selectedFileId={selectedFile?.id} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full">
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
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
