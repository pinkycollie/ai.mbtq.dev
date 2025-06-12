"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, MoreVertical, Hash, Users, Pin, Search } from "lucide-react"

interface ChatAreaProps {
  chatId: string
}

interface Message {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: string
  reactions?: { emoji: string; count: number }[]
}

export function ChatArea({ chatId }: ChatAreaProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Sample messages for different chats
  const sampleMessages: Record<string, Message[]> = {
    general: [
      {
        id: "1",
        user: "Sarah Johnson",
        avatar: "SJ",
        content: "Good morning team! Ready for today's sprint review?",
        timestamp: "9:00 AM",
        reactions: [
          { emoji: "👍", count: 3 },
          { emoji: "☕", count: 2 },
        ],
      },
      {
        id: "2",
        user: "Mike Chen",
        avatar: "MC",
        content: "Yes! The new features are looking great. Can't wait to show the progress.",
        timestamp: "9:02 AM",
      },
    ],
    "vercel-deployments": [
      {
        id: "1",
        user: "Vercel Bot",
        avatar: "VB",
        content: "🚀 Deployment successful! E-Commerce Platform is now live at https://ecommerce-mbtq.vercel.app",
        timestamp: "2:30 PM",
        reactions: [{ emoji: "🎉", count: 5 }],
      },
      {
        id: "2",
        user: "Alex Rodriguez",
        avatar: "AR",
        content: "Performance looks great! Core Web Vitals are all green ✅",
        timestamp: "2:32 PM",
      },
    ],
    "thirdweb-contracts": [
      {
        id: "1",
        user: "Emma Wilson",
        avatar: "EW",
        content:
          "Smart contract deployment completed on Polygon testnet. Contract address: 0x742d35Cc6634C0532925a3b8D4C9db96590b5",
        timestamp: "1:15 PM",
      },
    ],
    "github-updates": [
      {
        id: "1",
        user: "GitHub Bot",
        avatar: "GB",
        content: "📝 New PR opened: 'Add user authentication with NextAuth' by @sarah-johnson",
        timestamp: "11:30 AM",
        reactions: [{ emoji: "👀", count: 3 }],
      },
    ],
    announcements: [
      {
        id: "1",
        user: "Emma Wilson",
        avatar: "EW",
        content:
          "🎉 Great news! Our E-Commerce platform has reached 10k+ users! Thanks to everyone's hard work on the full-stack implementation.",
        timestamp: "Yesterday",
        reactions: [
          { emoji: "🎉", count: 12 },
          { emoji: "👏", count: 8 },
        ],
      },
    ],
  }

  useEffect(() => {
    setMessages(sampleMessages[chatId] || [])
  }, [chatId])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: "You",
        avatar: "YO",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")
    }
  }

  const getChatTitle = () => {
    const titles: Record<string, string> = {
      general: "# general",
      announcements: "# announcements",
      "vercel-deployments": "# vercel-deployments",
      "thirdweb-contracts": "# thirdweb-contracts",
      "github-updates": "# github-updates",
      "frontend-dev": "# frontend-dev",
      "backend-dev": "# backend-dev",
      "database-ops": "# database-ops",
      "code-reviews": "# code-reviews",
      "bug-reports": "# bug-reports",
      "dm-sarah": "Sarah Johnson",
      "dm-mike": "Mike Chen",
      "dm-alex": "Alex Rodriguez",
      "dm-emma": "Emma Wilson",
    }
    return titles[chatId] || "# general"
  }

  const getChatDescription = () => {
    const descriptions: Record<string, string> = {
      general: "General discussion and team updates",
      announcements: "Project announcements and important updates",
      "vercel-deployments": "Deployment status, previews, and Vercel updates",
      "thirdweb-contracts": "Smart contract development and Thirdweb integration",
      "github-updates": "Repository updates, PRs, and GitHub notifications",
      "frontend-dev": "Frontend development discussions and React/Next.js",
      "backend-dev": "Backend development, APIs, and server-side logic",
      "database-ops": "Database operations, migrations, and data management",
      "code-reviews": "Code review requests and feedback",
      "bug-reports": "Bug tracking and issue resolution",
    }
    return descriptions[chatId] || ""
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {chatId.startsWith("dm-") ? (
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {getChatTitle()
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Hash className="h-5 w-5" />
              )}
              {getChatTitle()}
            </h2>
            {getChatDescription() && <p className="text-sm text-muted-foreground">{getChatDescription()}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 group hover:bg-muted/50 p-2 rounded-lg -mx-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${msg.avatar}`} />
                <AvatarFallback>{msg.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {msg.reactions && (
                  <div className="flex gap-1 mt-2">
                    {msg.reactions.map((reaction, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        {reaction.emoji} {reaction.count}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder={`Message ${getChatTitle()}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
