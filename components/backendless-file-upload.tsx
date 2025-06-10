"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useBackendlessFile } from "./hooks/use-backendless"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, File, Trash2, FolderOpen, ArrowUpRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface UploadedFile {
  name: string
  url: string
  size: number
}

export function BackendlessFileUpload() {
  const { isLoading, error, uploadFile, deleteFile } = useBackendlessFile()
  const [folder, setFolder] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    try {
      // Start progress simulation
      setUploadProgress(0)
      const progressInterval = simulateProgress()

      // Upload file
      const result = await uploadFile(file, folder || undefined)

      // Clear progress simulation
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Add to uploaded files
      setUploadedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          url: result.fileURL,
          size: file.size,
        },
      ])

      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      })

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0)
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive",
      })
      setUploadProgress(0)
    }
  }

  const simulateProgress = () => {
    return setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 10
      })
    }, 200)
  }

  const handleDelete = async (fileUrl: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      // Extract file path from URL
      const urlParts = fileUrl.split("/")
      const filePath = urlParts.slice(urlParts.indexOf("files") + 1).join("/")

      await deleteFile(filePath)

      // Remove from uploaded files
      setUploadedFiles((prev) => prev.filter((file) => file.url !== fileUrl))

      toast({
        title: "File deleted",
        description: "The file has been deleted successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message || "An error occurred during deletion.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
        <CardDescription>Upload and manage files with Backendless</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="folder">Folder (Optional)</Label>
          <Input
            id="folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="e.g., images/profile"
          />
          <p className="text-xs text-muted-foreground">Leave empty to upload to the root folder</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Select File</Label>
          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              id="file"
              type="file"
              onChange={handleFileChange}
              disabled={isLoading}
              className="flex-1"
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <FolderOpen className="h-4 w-4 mr-2" />
              Browse
            </Button>
          </div>
        </div>

        {uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {error && <div className="bg-destructive/10 p-4 rounded-md text-destructive">{error}</div>}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Files</Label>
            <div className="border rounded-md divide-y">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(file.url)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Supported file types: images, documents, videos, and more.</p>
      </CardFooter>
    </Card>
  )
}
