import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps } from "@/components/ui/steps"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function ProjectDeployment() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Deploying Your Project</CardTitle>
          <CardDescription>Learn how to deploy your web application to Vercel using different methods</CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Choose a deployment method</Steps.Title>
                <Steps.Description>Vercel offers multiple ways to deploy your application</Steps.Description>
              </Steps.Header>
              <div className="mt-4">
                <Tabs defaultValue="git" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="git">Git Integration</TabsTrigger>
                    <TabsTrigger value="cli">Vercel CLI</TabsTrigger>
                    <TabsTrigger value="api">Vercel API</TabsTrigger>
                  </TabsList>
                  <TabsContent value="git" className="mt-4 space-y-4">
                    <p>
                      Connect your Git repository (GitHub, GitLab, or Bitbucket) to Vercel for automatic deployments.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        Go to the{" "}
                        <a
                          href="https://vercel.com/new"
                          className="text-primary underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Vercel dashboard
                        </a>{" "}
                        and click "Import Project"
                      </li>
                      <li>Select "Import Git Repository" and choose your Git provider</li>
                      <li>Select the repository you want to deploy</li>
                      <li>Configure your project settings</li>
                      <li>Click "Deploy"</li>
                    </ol>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Automatic Deployments</AlertTitle>
                      <AlertDescription>
                        Once connected, Vercel will automatically deploy your application whenever you push changes to
                        your repository [^2].
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                  <TabsContent value="cli" className="mt-4 space-y-4">
                    <p>Use the Vercel CLI to deploy your application directly from your terminal.</p>
                    <CodeBlock
                      language="bash"
                      code="# Navigate to your project directory
cd your-project

# Login to Vercel
vercel login

# Deploy your project
vercel"
                    />
                    <p>For production deployments, use:</p>
                    <CodeBlock language="bash" code="vercel --prod" />
                  </TabsContent>
                  <TabsContent value="api" className="mt-4 space-y-4">
                    <p>Use the Vercel API to programmatically deploy your application.</p>
                    <CodeBlock
                      language="javascript"
                      code="// Example using fetch API
async function deployToVercel() {
  const response = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'my-project',
      files: [/* your project files */],
      projectSettings: {
        framework: 'nextjs'
      }
    })
  });
  
  const data = await response.json();
  console.log('Deployment created:', data);
}"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Note: This is a simplified example. See the{" "}
                      <a
                        href="https://vercel.com/docs/api"
                        className="text-primary underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Vercel API documentation
                      </a>{" "}
                      for complete details.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Configure build settings</Steps.Title>
                <Steps.Description>Customize how Vercel builds and deploys your application</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>
                  Vercel automatically detects common frameworks and their build settings. You can customize these
                  settings using a <code>vercel.json</code> file in your project root:
                </p>
                <CodeBlock
                  language="json"
                  code='{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}'
                />
                <p>For Storybook deployments, you can use the following configuration [^1]:</p>
                <CodeBlock
                  language="json"
                  code='{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build-storybook",
  "devCommand": "npm run storybook",
  "installCommand": "npm install",
  "framework": null,
  "outputDirectory": "./storybook-static"
}'
                />
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Preview and production deployments</Steps.Title>
                <Steps.Description>Understand Vercel's deployment environments</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>Vercel provides two main types of deployments:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preview Deployments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Created automatically for pull/merge requests</li>
                        <li>Each gets a unique URL</li>
                        <li>Perfect for testing changes before merging</li>
                        <li>Can connect to different databases or environments</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Production Deployments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Created when merging to your main branch</li>
                        <li>Uses your primary domain</li>
                        <li>Optimized for performance and reliability</li>
                        <li>Instant rollbacks available if needed</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Steps.Step>
          </Steps>
        </CardContent>
      </Card>
    </div>
  )
}

