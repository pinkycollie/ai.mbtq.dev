import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  type: string
  lastUpdated: string
  progress: number
  compatibility: string[]
}

export function ProjectCard({ title, description, type, lastUpdated, progress, compatibility }: ProjectCardProps) {
  return (
    <Card className="bg-gray-950 border-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
          </div>
          <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-800">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-300">{description}</p>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-400">Compatible with:</p>
          <div className="flex flex-wrap gap-2">
            {compatibility.map((item, index) => (
              <Badge key={index} variant="outline" className="bg-gray-900 border-gray-700 text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between text-blue-400 hover:text-blue-300">
          Open Project
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
