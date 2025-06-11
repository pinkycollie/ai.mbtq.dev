import CyberCard from "@/components/cyber-card"

export default function CyberCardDemo() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-8">3D Cyber Card</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CyberCard title="AI POWERED" subtitle="Empowering entrepreneurs with" />

        <CyberCard title="BUSINESS TOOLS" subtitle="Comprehensive suite of" prompt="EXPLORE" />

        <CyberCard
          title="DEAF FRIENDLY"
          subtitle="Accessible solutions for"
          prompt="DISCOVER"
          highlightText="DEAF ENTREPRENEURS"
        />
      </div>

      <p className="text-gray-400 mt-8 max-w-md text-center">
        Hover over the cards to see the interactive 3D effect and animations. Each card represents a key aspect of 360
        Business Magician.
      </p>
    </div>
  )
}

