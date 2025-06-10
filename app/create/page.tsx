import { SimpleProjectCreator } from "@/components/simple-project-creator"

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
        <p className="text-muted-foreground">Start building with your favorite tools and templates</p>
      </div>
      <SimpleProjectCreator />
    </div>
  )
}
