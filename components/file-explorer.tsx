"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, File, FileCode, FilePlus, FolderPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileItem[]
  language?: string
  content?: string
}

interface FileExplorerProps {
  files: FileItem[]
  onFileSelect: (file: FileItem) => void
  selectedFileId?: string
}

// Sample file structure
export const sampleFiles: FileItem[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "app",
        name: "app",
        type: "folder",
        children: [
          {
            id: "page.tsx",
            name: "page.tsx",
            type: "file",
            language: "typescript",
            content: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Super Developer</h1>
    </main>
  )
}`,
          },
          {
            id: "layout.tsx",
            name: "layout.tsx",
            type: "file",
            language: "typescript",
            content: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
          },
        ],
      },
      {
        id: "components",
        name: "components",
        type: "folder",
        children: [
          {
            id: "button.tsx",
            name: "button.tsx",
            type: "file",
            language: "typescript",
            content: `import * as React from "react"
 
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}
 
export function Button({ variant = "default", ...props }: ButtonProps) {
  return <button {...props} />
}`,
          },
        ],
      },
      {
        id: "index.ts",
        name: "index.ts",
        type: "file",
        language: "typescript",
        content: `export * from './components/button'`,
      },
    ],
  },
  {
    id: "package.json",
    name: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "super-developer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}`,
  },
]

function FileExplorerItem({
  item,
  depth = 0,
  onFileSelect,
  selectedFileId,
}: {
  item: FileItem
  depth?: number
  onFileSelect: (file: FileItem) => void
  selectedFileId?: string
}) {
  const [isOpen, setIsOpen] = useState(true)
  const isSelected = item.id === selectedFileId

  const handleToggle = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen)
    } else {
      onFileSelect(item)
    }
  }

  const getFileIcon = () => {
    if (item.type === "folder") {
      return isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
    }

    if (item.name.endsWith(".tsx") || item.name.endsWith(".jsx")) {
      return <FileCode className="h-4 w-4 text-blue-500" />
    }

    if (item.name.endsWith(".ts") || item.name.endsWith(".js")) {
      return <FileCode className="h-4 w-4 text-yellow-500" />
    }

    if (item.name.endsWith(".json")) {
      return <FileCode className="h-4 w-4 text-orange-500" />
    }

    return <File className="h-4 w-4" />
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 text-sm cursor-pointer hover:bg-muted/50 rounded",
          isSelected && "bg-muted text-primary",
        )}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onClick={handleToggle}
      >
        {getFileIcon()}
        <span className="ml-1.5">{item.name}</span>
      </div>

      {item.type === "folder" && isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <FileExplorerItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              selectedFileId={selectedFileId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileExplorer({ files, onFileSelect, selectedFileId }: FileExplorerProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="font-medium">Explorer</h3>
        <div className="flex gap-1">
          <button className="p-1 rounded hover:bg-muted">
            <FilePlus className="h-4 w-4" />
          </button>
          <button className="p-1 rounded hover:bg-muted">
            <FolderPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-2">
        {files.map((file) => (
          <FileExplorerItem key={file.id} item={file} onFileSelect={onFileSelect} selectedFileId={selectedFileId} />
        ))}
      </div>
    </div>
  )
}
