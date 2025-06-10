import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Star } from "lucide-react"
import { Input } from "@/components/ui/input"

const promptCategories = [
  {
    name: "Code Generation",
    prompts: [
      {
        title: "React Component",
        description: "Generate a React component with TypeScript",
        prompt:
          "Create a React component that displays a list of items with pagination. Use TypeScript for type safety and include proper accessibility attributes.",
        tags: ["React", "TypeScript", "UI"],
      },
      {
        title: "API Route",
        description: "Create a Next.js API route with error handling",
        prompt:
          "Create a Next.js API route that fetches data from an external API, includes error handling, and returns the data in a standardized format.",
        tags: ["Next.js", "API", "Backend"],
      },
    ],
  },
  {
    name: "UI Design",
    prompts: [
      {
        title: "Dashboard Layout",
        description: "Generate a responsive dashboard layout",
        prompt:
          "Create a responsive dashboard layout with a sidebar, header, and main content area. Include dark mode support and use Tailwind CSS for styling.",
        tags: ["UI", "Tailwind", "Responsive"],
      },
      {
        title: "Form Design",
        description: "Create a multi-step form with validation",
        prompt:
          "Design a multi-step form with client-side validation, progress indicators, and a summary screen. Make it accessible and responsive.",
        tags: ["Form", "Validation", "UX"],
      },
    ],
  },
]

export function PromptLibrary() {
  return (
    <Card className="bg-gray-950 border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Prompt Library</CardTitle>
            <CardDescription>Curated prompts for efficient development</CardDescription>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Prompt
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input placeholder="Search prompts..." className="bg-black border-gray-800 pl-10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <Tabs defaultValue={promptCategories[0].name} className="w-full">
          <TabsList className="bg-black border border-gray-800 w-full">
            {promptCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="flex-1 data-[state=active]:bg-gray-900">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {promptCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-4 space-y-4">
              {category.prompts.map((prompt, index) => (
                <div key={index} className="rounded-lg border border-gray-800 bg-black p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{prompt.title}</h4>
                      <p className="text-xs text-gray-400">{prompt.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="rounded bg-gray-950 p-3 text-sm font-mono text-gray-300 overflow-x-auto">
                    {prompt.prompt}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {prompt.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="bg-gray-900 border-gray-700 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:text-blue-300">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
          Browse All Prompts
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Create Custom Prompt
        </Button>
      </CardFooter>
    </Card>
  )
}
