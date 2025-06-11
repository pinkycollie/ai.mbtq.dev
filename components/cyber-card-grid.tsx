"use client"

import SlideWrapper from "./slide-wrapper"
import CyberCard from "./cyber-card"

interface CardData {
  title: string
  subtitle: string
  prompt?: string
  highlightText?: string
}

export default function CyberCardGrid() {
  const cards: CardData[] = [
    {
      title: "AI POWERED",
      subtitle: "Empowering entrepreneurs with",
      prompt: "HOVER ME",
      highlightText: "360 BUSINESS MAGICIAN",
    },
    {
      title: "BUSINESS TOOLS",
      subtitle: "Comprehensive suite of",
      prompt: "EXPLORE",
      highlightText: "SMART SOLUTIONS",
    },
    {
      title: "DEAF FRIENDLY",
      subtitle: "Accessible solutions for",
      prompt: "DISCOVER",
      highlightText: "DEAF ENTREPRENEURS",
    },
    {
      title: "AUTOMATION",
      subtitle: "Streamline your workflow with",
      prompt: "EXPERIENCE",
      highlightText: "SMART PROCESSES",
    },
    {
      title: "FUNDING",
      subtitle: "Secure your business with",
      prompt: "LEARN MORE",
      highlightText: "STRATEGIC CAPITAL",
    },
    {
      title: "MENTORSHIP",
      subtitle: "Grow your business with",
      prompt: "CONNECT",
      highlightText: "EXPERT GUIDANCE",
    },
  ]

  return (
    <SlideWrapper>
      <div className="min-h-full flex flex-col items-center justify-center bg-gray-900 py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">360 Business Magician Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="flex justify-center">
              <CyberCard
                title={card.title}
                subtitle={card.subtitle}
                prompt={card.prompt}
                highlightText={card.highlightText}
              />
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

