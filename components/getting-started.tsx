import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Mail, Terminal } from "lucide-react"
import { Steps } from "@/components/ui/steps"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"

export function GettingStarted() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Getting Started with Vercel</CardTitle>
          <CardDescription>
            Vercel is a developer cloud to build and deploy web applications [^2]. Follow these steps to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Create an account</Steps.Title>
                <Steps.Description>Sign up for a Vercel account using one of the available methods</Steps.Description>
              </Steps.Header>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <Github className="h-8 w-8 mb-2" />
                    <CardTitle className="text-base">GitHub</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="https://vercel.com/signup?next=%2F&provider=github" target="_blank">
                        Continue with GitHub
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <Mail className="h-8 w-8 mb-2" />
                    <CardTitle className="text-base">Email</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="https://vercel.com/signup?next=%2F&provider=email" target="_blank">
                        Continue with Email
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <Terminal className="h-8 w-8 mb-2" />
                    <CardTitle className="text-base">CLI</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="https://vercel.com/docs/cli" target="_blank">
                        Install Vercel CLI
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Install the Vercel CLI (Optional)</Steps.Title>
                <Steps.Description>
                  The Vercel CLI allows you to interact with Vercel from your terminal
                </Steps.Description>
              </Steps.Header>
              <div className="mt-4">
                <CodeBlock language="bash" code="npm i -g vercel" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  You can also use other package managers like pnpm, yarn, or bun [^3]
                </p>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Choose your development path</Steps.Title>
                <Steps.Description>Vercel supports multiple ways to get started with your project</Steps.Description>
              </Steps.Header>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Start with a template</CardTitle>
                    <CardDescription>
                      Choose from a variety of pre-built templates to get started quickly
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link href="https://vercel.com/templates" target="_blank">
                        Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Import an existing project</CardTitle>
                    <CardDescription>Connect your Git repository and deploy your existing project</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link href="https://vercel.com/new" target="_blank">
                        Import Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Steps.Step>
          </Steps>
        </CardContent>
      </Card>
    </div>
  )
}

