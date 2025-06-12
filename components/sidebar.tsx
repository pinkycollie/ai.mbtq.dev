"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Hash, MessageCircle, Users, Settings, Plus, Bell, User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarProps {
  selectedChat: string
  onChatSelect: (chatId: string) => void
  onProfileClick: () => void
}

export function Sidebar({ selectedChat, onChatSelect, onProfileClick }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const channels = [
    { id: "general", name: "general", unread: 3, type: "channel" },
    { id: "announcements", name: "announcements", unread: 1, type: "channel" },
    { id: "vercel-deployments", name: "vercel-deployments", unread: 2, type: "channel" },
    { id: "thirdweb-contracts", name: "thirdweb-contracts", unread: 0, type: "channel" },
    { id: "github-updates", name: "github-updates", unread: 5, type: "channel" },
    { id: "frontend-dev", name: "frontend-dev", unread: 1, type: "channel" },
    { id: "backend-dev", name: "backend-dev", unread: 4, type: "channel" },
    { id: "database-ops", name: "database-ops", unread: 0, type: "channel" },
    { id: "code-reviews", name: "code-reviews", unread: 7, type: "channel" },
    { id: "bug-reports", name: "bug-reports", unread: 2, type: "channel" },
  ]

  const directMessages = [
    { id: "dm-sarah", name: "Sarah Johnson", status: "online", unread: 2 },
    { id: "dm-mike", name: "Mike Chen", status: "away", unread: 0 },
    { id: "dm-alex", name: "Alex Rodriguez", status: "offline", unread: 1 },
    { id: "dm-emma", name: "Emma Wilson", status: "online", unread: 0 },
  ]

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredDMs = directMessages.filter((dm) => dm.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-80 bg-muted/30 border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">mbtq.dev</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onProfileClick}>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Project Switcher */}
        <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">E-Commerce Platform</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>E-Commerce Platform</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>DeFi Dashboard</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>NFT Marketplace</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>SaaS Analytics</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="h-4 w-4 mr-2" />
                <span>New Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Channels */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" />
                CHANNELS
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {filteredChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant={selectedChat === channel.id ? "secondary" : "ghost"}
                  className="w-full justify-between h-8 px-2"
                  onClick={() => onChatSelect(channel.id)}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                DIRECT MESSAGES
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {filteredDMs.map((dm) => (
                <Button
                  key={dm.id}
                  variant={selectedChat === dm.id ? "secondary" : "ghost"}
                  className="w-full justify-between h-10 px-2"
                  onClick={() => onChatSelect(dm.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`/placeholder.svg?height=24&width=24&text=${dm.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}`}
                        />
                        <AvatarFallback className="text-xs">
                          {dm.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                          dm.status === "online"
                            ? "bg-green-500"
                            : dm.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm truncate">{dm.name}</span>
                  </div>
                  {dm.unread > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                      {dm.unread}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Development Teams */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                DEV TEAMS
              </h3>
            </div>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start h-8 px-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">Frontend Team</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">Backend Team</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">DevOps Team</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">Web3 Team</span>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
