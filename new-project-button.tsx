"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface NewProjectButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function NewProjectButton({ className, variant = "default" }: NewProjectButtonProps) {
  const router = useRouter()

  const handleNewProject = () => {
    // Navigate to the create project page
    router.push("/dashboard/create")
  }

  return (
    <Button onClick={handleNewProject} className={className} variant={variant}>
      <PlusCircle className="mr-2 h-4 w-4" />
      New Project
    </Button>
  )
}
