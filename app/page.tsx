import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GettingStarted } from "@/components/getting-started"
import { ProjectDeployment } from "@/components/project-deployment"
import { EnvironmentConfig } from "@/components/environment-config"
import { DomainSetup } from "@/components/domain-setup"
import { TeamCollaboration } from "@/components/team-collaboration"
import { Monitoring } from "@/components/monitoring"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Vercel Platform Guide</h1>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          A comprehensive step-by-step guide to using Vercel for deploying and managing your web applications
        </p>

        <Tabs defaultValue="getting-started" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>
          <TabsContent value="getting-started">
            <GettingStarted />
          </TabsContent>
          <TabsContent value="deployment">
            <ProjectDeployment />
          </TabsContent>
          <TabsContent value="environment">
            <EnvironmentConfig />
          </TabsContent>
          <TabsContent value="domains">
            <DomainSetup />
          </TabsContent>
          <TabsContent value="teams">
            <TeamCollaboration />
          </TabsContent>
          <TabsContent value="monitoring">
            <Monitoring />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

