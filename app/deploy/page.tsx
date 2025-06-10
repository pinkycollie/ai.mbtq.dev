import { VercelDeploy } from "@/components/vercel-deploy"

export default function DeployPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Deploy Project</h1>
        <p className="text-muted-foreground">Deploy your project to Vercel with one click</p>
      </div>
      <VercelDeploy />
    </div>
  )
}
