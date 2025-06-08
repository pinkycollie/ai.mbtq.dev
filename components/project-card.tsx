import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  href: string
  imageUrl?: string
  genAslEnabled?: boolean
  genAslEndpoint?: string
}

export function ProjectCard({
  title,
  description,
  href,
  imageUrl,
  genAslEnabled = false,
  genAslEndpoint,
}: ProjectCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden rounded-md bg-muted relative">
          {imageUrl && (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          )}
          {title.toLowerCase().includes("sign language") && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              GENASL Ready
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            Amazon Generative ASL Compatible
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold group-hover:underline">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
          {genAslEnabled && (
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <span className="flex items-center">🤖 Amazon GENASL Integration Active</span>
            </div>
          )}
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span className="flex items-center">
              View Project <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
