"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, RefreshCw } from "lucide-react"

export function BudgetAnalyzer() {
  const [budget, setBudget] = useState(100)
  const [timeframe, setTimeframe] = useState("monthly")

  // Calculate resource allocation based on budget
  const computeResources = Math.floor(budget * 0.4)
  const storageResources = Math.floor(budget * 0.3)
  const aiResources = Math.floor(budget * 0.3)

  return (
    <Card className="bg-gray-950 border-gray-800">
      <CardHeader>
        <CardTitle>Budget Analyzer</CardTitle>
        <CardDescription>Estimate your project costs and resource allocation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Budget</h3>
              <p className="text-xs text-gray-400">Set your development budget</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">${budget}</span>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[100px] bg-black border-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-950 border-gray-800">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Slider
            value={[budget]}
            min={0}
            max={1000}
            step={10}
            onValueChange={(value) => setBudget(value[0])}
            className="py-4"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Resource Allocation</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Computing</span>
                <span>${computeResources}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(computeResources / budget) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">Serverless functions, Edge computing</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span>${storageResources}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${(storageResources / budget) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">Databases, Blob storage, KV storage</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Services</span>
                <span>${aiResources}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${(aiResources / budget) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">AI SDK, GPT models, Vector databases</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="bg-black border border-gray-800 w-full">
            <TabsTrigger value="recommendations" className="flex-1 data-[state=active]:bg-gray-900">
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex-1 data-[state=active]:bg-gray-900">
              Plan Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-4 space-y-4">
            <div className="rounded-lg border border-gray-800 bg-black p-4">
              <h4 className="font-medium mb-2">Recommended Plan: Pro</h4>
              <p className="text-sm text-gray-300 mb-2">
                Based on your budget of ${budget}, we recommend the Pro plan.
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>Unlimited projects and deployments</li>
                <li>500GB storage included</li>
                <li>Advanced analytics and monitoring</li>
                <li>Priority support</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-800 bg-black p-4">
              <h4 className="font-medium mb-2">Cost Optimization Tips</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>Use Edge Functions for better performance and lower costs</li>
                <li>Implement caching strategies to reduce database queries</li>
                <li>Optimize image storage with Vercel Blob</li>
                <li>Consider serverless databases for scaling costs with usage</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <div className="rounded-lg border border-gray-800 bg-black p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Plan Comparison</h4>
                <Button variant="outline" size="sm" className="h-8 border-gray-800 bg-black hover:bg-gray-900">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Detailed Report
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="font-medium">Plan</div>
                  <div className="font-medium">Hobby</div>
                  <div className="font-medium">Pro</div>
                  <div className="font-medium">Enterprise</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-gray-400">Price</div>
                  <div>$0</div>
                  <div>$20-$100</div>
                  <div>Custom</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-gray-400">Projects</div>
                  <div>3</div>
                  <div>Unlimited</div>
                  <div>Unlimited</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-gray-400">Deployments</div>
                  <div>100/day</div>
                  <div>Unlimited</div>
                  <div>Unlimited</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-gray-400">Storage</div>
                  <div>10GB</div>
                  <div>500GB</div>
                  <div>Custom</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
          <RefreshCw className="mr-2 h-4 w-4" />
          Recalculate
        </Button>
        <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  )
}
