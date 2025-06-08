import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investment Perspective | Sign Language AI Chatbot",
  description: "Investment opportunity for a revolutionary sign language AI chatbot with blockchain integration",
}

export default function InvestmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-gradient-to-b from-background to-muted min-h-screen">{children}</div>
}
