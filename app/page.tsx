"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Check,
  Sparkles,
  Braces,
  Terminal,
  Zap,
  Code,
  Database,
  Server,
  Plus,
  Rocket,
  Wallet,
  Globe,
  Github,
  ExternalLink,
} from "lucide-react"

export default function HomePage() {
  const [activeProjects] = useState([
    {
      id: 1,
      name: "DeFi Dashboard",
      description: "Web3 dashboard with Thirdweb integration",
      status: "deployed",
      url: "https://defi-dashboard.vercel.app",
      tech: ["Next.js", "Thirdweb", "Tailwind"],
    },
    {
      id: 2,
      name: "NFT Marketplace",
      description: "Simple NFT marketplace template",
      status: "building",
      url: null,
      tech: ["React", "Thirdweb", "Chakra UI"],
    },
  ])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">SUPER DEVELOPER</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#tools"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tools
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/90">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex bg-blue-600 text-white">New Release</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Build Apps with AI-Powered Development
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Supercharge your development workflow with AI-powered tools. Create, deploy, and manage your projects
                  faster than ever before.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-background object-cover shadow-xl lg:order-last">
              <div className="h-full w-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 flex items-center justify-center">
                <div className="w-full h-full bg-black/80 rounded-lg border border-gray-800 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm text-gray-400">AI Terminal</div>
                  </div>
                  <div className="flex-1 font-mono text-sm text-green-400 overflow-hidden">
                    <div className="typing-animation">
                      <p>$ Generate a Next.js app with authentication</p>
                      <p className="text-gray-400 mt-2">Analyzing requirements...</p>
                      <p className="text-gray-400">Creating project structure...</p>
                      <p className="text-gray-400">Setting up authentication...</p>
                      <p className="text-white mt-2">✓ Project generated successfully!</p>
                      <p className="mt-2">$ Deploy to Vercel</p>
                      <p className="text-gray-400 mt-2">Building project...</p>
                      <p className="text-gray-400">Optimizing assets...</p>
                      <p className="text-white mt-2">✓ Deployment complete!</p>
                      <p className="text-blue-400 mt-2">https://my-nextjs-app.vercel.app</p>
                      <p className="mt-2 flex items-center">
                        $ <span className="ml-1 animate-pulse">|</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Plus className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">New Project</h3>
              <p className="text-sm text-muted-foreground">Create new app</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Rocket className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Deploy</h3>
              <p className="text-sm text-muted-foreground">Push to Vercel</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Wallet className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Web3 Setup</h3>
              <p className="text-sm text-muted-foreground">Thirdweb config</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold">Templates</h3>
              <p className="text-sm text-muted-foreground">Quick starts</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Everything You Need to Build Faster
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform provides all the tools you need to accelerate your development workflow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-blue-600/10 p-3 rounded-full mb-2">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">AI App Creator</h3>
              <p className="text-center text-muted-foreground">
                Describe your app in natural language and let AI generate the code.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Generate full-stack applications</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Customize and edit generated code</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Deploy directly to Vercel</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-purple-600/10 p-3 rounded-full mb-2">
                <Braces className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold">AI Project Generator</h3>
              <p className="text-center text-muted-foreground">
                Create fully-structured projects with all the files you need.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Next.js, React, and more frameworks</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Database and API integration</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>One-click deployment</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-600/10 p-3 rounded-full mb-2">
                <Terminal className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">AI Console</h3>
              <p className="text-center text-muted-foreground">
                Use the terminal interface for code generation and project management.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Generate code snippets</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Run commands with AI assistance</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Integrate with your workflow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Powerful Tools</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Integrated Development Environment
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform integrates with the tools you already use, making your workflow seamless.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
            <div className="flex flex-col space-y-4 rounded-lg border p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/10 p-3 rounded-full">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Code Editor</h3>
                  <p className="text-muted-foreground">
                    Edit your code directly in the browser with syntax highlighting and auto-completion.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 h-40 overflow-hidden">
                <div className="font-mono text-sm">
                  <div className="text-blue-600">function</div> <div className="text-yellow-600">generateApp</div>
                  <div className="text-purple-600">(</div>
                  <div className="text-orange-600">description</div>
                  <div className="text-purple-600">:</div> <div className="text-green-600">string</div>
                  <div className="text-purple-600">)</div> <div className="text-purple-600">{"{"}</div>
                  <div className="ml-4">
                    <div className="text-blue-600">return</div> <div className="text-blue-600">new</div>{" "}
                    <div className="text-yellow-600">Promise</div>
                    <div className="text-purple-600">(</div>
                    <div className="text-orange-600">resolve</div> <div className="text-purple-600">{"->"}</div>{" "}
                    <div className="text-purple-600">{"{"}</div>
                  </div>
                  <div className="ml-8">
                    <div className="text-green-600">// AI magic happens here</div>
                  </div>
                  <div className="ml-4">
                    <div className="text-purple-600">{"}"})</div>
                  </div>
                  <div className="text-purple-600">{"}"}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg border p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/10 p-3 rounded-full">
                  <Terminal className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Terminal</h3>
                  <p className="text-muted-foreground">
                    Run commands and manage your projects from the terminal with AI assistance.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-black p-4 h-40 overflow-hidden">
                <div className="font-mono text-sm text-green-400">
                  <p>$ npm create next-app my-project</p>
                  <p className="text-gray-400">Creating a new Next.js app in ./my-project...</p>
                  <p className="text-white">✓ Project created successfully!</p>
                  <p>$ cd my-project</p>
                  <p>$ npm run dev</p>
                  <p className="text-gray-400">ready - started server on 0.0.0.0:3000, url: http://localhost:3000</p>
                  <p className="flex items-center">
                    $ <span className="ml-1 animate-pulse">|</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg border p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-600/10 p-3 rounded-full">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Database Integration</h3>
                  <p className="text-muted-foreground">Connect to your databases and manage your data with ease.</p>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 h-40 overflow-hidden">
                <div className="font-mono text-sm">
                  <div className="text-purple-600">model</div> <div className="text-blue-600">User</div>{" "}
                  <div className="text-purple-600">{"{"}</div>
                  <div className="ml-4">
                    <div className="text-blue-600">id</div> <div className="text-purple-600">String</div>{" "}
                    <div className="text-orange-600">@id</div> <div className="text-orange-600">@default(cuid())</div>
                  </div>
                  <div className="ml-4">
                    <div className="text-blue-600">email</div> <div className="text-purple-600">String</div>{" "}
                    <div className="text-orange-600">@unique</div>
                  </div>
                  <div className="ml-4">
                    <div className="text-blue-600">name</div> <div className="text-purple-600">String?</div>
                  </div>
                  <div className="ml-4">
                    <div className="text-blue-600">posts</div> <div className="text-purple-600">Post[]</div>
                  </div>
                  <div className="text-purple-600">{"}"}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg border p-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-600/10 p-3 rounded-full">
                  <Server className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Deployment</h3>
                  <p className="text-muted-foreground">Deploy your applications to Vercel with one click.</p>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 h-40 overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Production</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full"></div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">my-project.vercel.app</p>
                    <p className="text-xs text-muted-foreground">Deployed from main</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-muted-foreground">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Choose the Right Plan for You</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We offer flexible pricing options to fit your needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            {/* Free Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-muted-foreground">For hobbyists and side projects</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>3 projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Basic AI features</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Community support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
            {/* Pro Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-lg relative">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For professionals and teams</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$19</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Advanced AI features</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Custom domains</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">For large organizations</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$99</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>All AI features</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>SSO & advanced security</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Don't just take our word for it. Here's what our users have to say.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="flex flex-col rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                  <span className="text-lg font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Frontend Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "This platform has completely transformed my development workflow. I can now build and deploy
                applications in a fraction of the time it used to take."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex flex-col rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                  <span className="text-lg font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The AI-powered code generation has saved me countless hours. I can describe what I want to build, and
                it creates the scaffolding for me. It's like having a senior developer pair programming with me at all
                times."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex flex-col rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                  <span className="text-lg font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">CTO, TechStart</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "We've integrated this platform into our development workflow, and it's been a game-changer. Our team's
                productivity has increased by 40%, and we're shipping features faster than ever."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="tools">Dev Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={project.status === "deployed" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    {project.url && (
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Project Card */}
            <Card className="border-dashed border-2 hover:border-solid transition-all cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">New Project</h3>
                <p className="text-sm text-muted-foreground">Start a new project with templates</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Next.js + Thirdweb
                </CardTitle>
                <CardDescription>Full-stack Web3 app with authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Thirdweb</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
                <Button className="w-full">
                  Use Template
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  NFT Marketplace
                </CardTitle>
                <CardDescription>Ready-to-deploy NFT marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Thirdweb</Badge>
                  <Badge variant="outline">Tailwind</Badge>
                </div>
                <Button className="w-full">
                  Use Template
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  DeFi Dashboard
                </CardTitle>
                <CardDescription>Token tracking and DeFi analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Web3.js</Badge>
                  <Badge variant="outline">Charts</Badge>
                </div>
                <Button className="w-full">
                  Use Template
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vercel Integration</CardTitle>
                <CardDescription>Quick deploy and manage your Vercel projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2">
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy to Vercel
                </Button>
                <Button variant="outline" className="w-full">
                  View Deployments
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thirdweb Tools</CardTitle>
                <CardDescription>Web3 development utilities and contract management</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2">
                  <Wallet className="h-4 w-4 mr-2" />
                  Contract Dashboard
                </Button>
                <Button variant="outline" className="w-full">
                  SDK Generator
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
