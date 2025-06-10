import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Database, Server, Zap } from "lucide-react"

const projectRecommendations = [
  {
    title: "E-commerce Platform",
    recommendations: [
      {
        title: "Add Product Search",
        description: "Implement full-text search for products",
        tools: ["Algolia", "Typesense"],
        priority: "High",
      },
      {
        title: "Optimize Images",
        description: "Implement image optimization for product images",
        tools: ["Vercel Image Optimization", "Cloudinary"],
        priority: "Medium",
      },
      {
        title: "Add Payment Gateway",
        description: "Integrate additional payment methods",
        tools: ["Stripe", "PayPal"],
        priority: "Low",
      },
    ],
  },
  {
    title: "Social Media App",
    recommendations: [
      {
        title: "Real-time Chat",
        description: "Implement real-time messaging between users",
        tools: ["Pusher", "Socket.io"],
        priority: "High",
      },
      {
        title: "Content Moderation",
        description: "Add AI-powered content moderation",
        tools: ["OpenAI Moderation API", "AWS Rekognition"],
        priority: "Medium",
      },
    ],
  },
]

const frameworkCompatibility = [
  {
    name: "Netflix-like Streaming",
    frameworks: [
      { name: "Next.js", compatibility: "High", features: ["Server Components", "Streaming SSR", "Edge Functions"] },
      { name: "Remix", compatibility: "Medium", features: ["Nested Routes", "Loader Data"] },
      { name: "SvelteKit", compatibility: "Medium", features: ["Lightweight", "Fast Rendering"] },
    ],
  },
  {
    name: "Facebook-like Social",
    frameworks: [
      { name: "Next.js", compatibility: "High", features: ["API Routes", "Real-time Updates", "Authentication"] },
      { name: "Remix", compatibility: "High", features: ["Form Handling", "Optimistic UI"] },
      { name: "Astro", compatibility: "Low", features: ["Static Content"] },
    ],
  },
]

export function RecommendationPanel() {
  return (
    <Card className="bg-gray-950 border-gray-800">
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>Smart suggestions to improve your projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="project" className="w-full">
          <TabsList className="bg-black border border-gray-800 w-full">
            <TabsTrigger value="project" className="flex-1 data-[state=active]:bg-gray-900">
              Project Recommendations
            </TabsTrigger>
            <TabsTrigger value="framework" className="flex-1 data-[state=active]:bg-gray-900">
              Framework Compatibility
            </TabsTrigger>
            <TabsTrigger value="stack" className="flex-1 data-[state=active]:bg-gray-900">
              Tech Stack Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="project" className="mt-4 space-y-4">
            {projectRecommendations.map((project, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-medium">{project.title}</h3>

                {project.recommendations.map((rec, recIndex) => (
                  <div key={recIndex} className="rounded-lg border border-gray-800 bg-black p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {rec.title}
                          <Badge
                            variant="outline"
                            className={`
                              text-xs
                              ${rec.priority === "High" ? "bg-red-950/30 text-red-400 border-red-800" : ""}
                              ${rec.priority === "Medium" ? "bg-yellow-950/30 text-yellow-400 border-yellow-800" : ""}
                              ${rec.priority === "Low" ? "bg-green-950/30 text-green-400 border-green-800" : ""}
                            `}
                          >
                            {rec.priority} Priority
                          </Badge>
                        </h4>
                        <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-400">Recommended tools:</span>
                        {rec.tools.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="outline" className="bg-gray-900 border-gray-700 text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:text-blue-300">
                        Implement
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="framework" className="mt-4 space-y-4">
            {frameworkCompatibility.map((type, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-medium">{type.name}</h3>

                <div className="rounded-lg border border-gray-800 bg-black p-4">
                  <div className="space-y-4">
                    {type.frameworks.map((framework, fwIndex) => (
                      <div
                        key={fwIndex}
                        className="flex items-start justify-between border-b border-gray-800 pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <h4 className="font-medium">{framework.name}</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {framework.features.map((feature, featIndex) => (
                              <Badge key={featIndex} variant="outline" className="bg-gray-900 border-gray-700 text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                            text-xs
                            ${framework.compatibility === "High" ? "bg-green-950/30 text-green-400 border-green-800" : ""}
                            ${framework.compatibility === "Medium" ? "bg-yellow-950/30 text-yellow-400 border-yellow-800" : ""}
                            ${framework.compatibility === "Low" ? "bg-red-950/30 text-red-400 border-red-800" : ""}
                          `}
                        >
                          {framework.compatibility} Compatibility
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="stack" className="mt-4">
            <div className="rounded-lg border border-gray-800 bg-black p-4 space-y-4">
              <h3 className="font-medium">Recommended Tech Stack</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="bg-blue-900/20 p-2 rounded-md">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Frontend</h4>
                    <p className="text-sm text-gray-300 mb-2">Next.js with App Router</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Server Components
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Streaming
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Edge Runtime
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="bg-purple-900/20 p-2 rounded-md">
                    <Database className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Database</h4>
                    <p className="text-sm text-gray-300 mb-2">Vercel Postgres + Prisma ORM</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Serverless
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Type Safety
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Zero Config
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-900/20 p-2 rounded-md">
                    <Server className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Authentication</h4>
                    <p className="text-sm text-gray-300 mb-2">Auth.js (NextAuth)</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        OAuth
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        JWT
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Session Management
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Generate Custom Recommendations
        </Button>
      </CardFooter>
    </Card>
  )
}
