"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Send, Video, ImageIcon, Coins } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useTokens } from "@/hooks/useTokens"

// Message type for chat
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

// Generate unique ID with fallback
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default function ChatPage() {
  const { user } = useAuth()
  const { balance, refreshBalance } = useTokens(user?.id)
  const [sessionId] = useState(() => generateId())
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; type: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          userId: user?.id,
          sessionId: sessionId,
        }),
      })

      if (response.ok) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let assistantContent = ''

        const assistantMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: ''
        }
        setMessages(prev => [...prev, assistantMessage])

        while (reader) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          // Parse streaming response
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const text = JSON.parse(line.slice(2))
                assistantContent += text
                setMessages(prev =>
                  prev.map(m => m.id === assistantMessage.id
                    ? { ...m, content: assistantContent }
                    : m
                  )
                )
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
        refreshBalance()
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const response = await fetch(`/api/upload?filename=${file.name}&userId=${user?.id}`, {
        method: "POST",
        body: file,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadedFiles((prev) => [
          ...prev,
          {
            url: result.url,
            type: file.type.startsWith("video/") ? "video" : "image",
          },
        ])
        refreshBalance()

        // Add a message about the upload
        const uploadMessage = `I've uploaded a ${file.type.startsWith("video/") ? "video" : "image"} file: ${file.name}. Can you help me interpret the sign language content?`
        setInput(uploadMessage)
      }
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Sign Language AI Assistant</h1>
          {user && (
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Coins className="h-4 w-4 text-yellow-600" />
              <span className="font-semibold text-yellow-800">{balance} tokens</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">
          Upload sign language videos or images, ask questions, and get AI-powered interpretations. Earn tokens for
          every interaction!
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Sign Language Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Upload Video
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Upload Image
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Earn 5 tokens for each upload! Supported formats: MP4, MOV, JPG, PNG
          </p>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Uploaded Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {file.type === "video" ? (
                    <video src={file.url} controls className="w-full h-48 object-cover rounded" />
                  ) : (
                    <img
                      src={file.url || "/placeholder.svg"}
                      alt="Uploaded sign language content"
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <h3 className="text-lg font-semibold mb-2">Welcome to Sign Language AI!</h3>
                <p>Start by uploading a sign language video or asking a question.</p>
                <div className="mt-4 text-sm">
                  <p>💡 Try asking:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>"How do I sign 'hello' in ASL?"</li>
                    <li>"What are the basic ASL handshapes?"</li>
                    <li>"Can you help me practice fingerspelling?"</li>
                  </ul>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about sign language or describe what you see..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Earn 1 token for each message! Upload content for 5 tokens.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
