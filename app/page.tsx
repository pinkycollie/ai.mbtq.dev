"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatArea } from "@/components/chat-area"
import { UserProfile } from "@/components/user-profile"
import { ThemeProvider } from "@/components/theme-provider"

export default function UnifiedPlatform() {
  const [selectedChat, setSelectedChat] = useState("general")
  const [showProfile, setShowProfile] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen bg-background">
        <Sidebar
          selectedChat={selectedChat}
          onChatSelect={setSelectedChat}
          onProfileClick={() => setShowProfile(true)}
        />
        <ChatArea chatId={selectedChat} />
        {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      </div>
    </ThemeProvider>
  )
}
