import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"

export const metadata: Metadata = {
  title: "AI Projects | Pinky's AI Projects",
  description: "Explore my artificial intelligence projects and innovations",
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">My AI Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="Sign Language AI Model"
          description="An interactive AI model that translates sign language in real-time"
          href="/projects/sign-language-ai"
          imageUrl="/placeholder.svg?height=200&width=400"
        />
        {/* Add more project cards here as needed */}
      </div>
    </div>
  )
}
