import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Clock, Cpu, Database, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PinkSync Estimator | MBTQ AI Platform",
  description: "Estimate processing time and resources for sign language AI synchronization tasks",
}

export default function PinkSyncEstimatorPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">PinkSync Estimator</h1>
          <p className="text-lg text-muted-foreground">
            Estimate processing time and resources for sign language AI synchronization tasks
          </p>
        </div>

        {/* Estimator Dashboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Resource Estimation Calculator
            </CardTitle>
            <CardDescription>
              Calculate estimated processing requirements for your AI workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Estimation Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Input Parameters</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Video Duration</span>
                    <span className="font-medium">5 minutes</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Sign Language</span>
                    <span className="font-medium">ASL</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Quality Level</span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Output Format</span>
                    <span className="font-medium">Text + Gloss</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Estimated Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      Processing Time
                    </span>
                    <span className="font-medium text-blue-700">~45 seconds</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-green-600" />
                      CPU Usage
                    </span>
                    <span className="font-medium text-green-700">~65%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-purple-600" />
                      Memory
                    </span>
                    <span className="font-medium text-purple-700">~2.4 GB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      Token Cost
                    </span>
                    <span className="font-medium text-yellow-700">~12 tokens</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button size="lg" className="gap-2">
                Run Estimation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sync Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Batch Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Estimate resources for processing multiple videos simultaneously with optimized batching.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Real-time Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calculate latency and resource requirements for live sign language streaming.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Multi-Language</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Estimate costs for translating between multiple sign languages (ASL, BSL, LSRD, etc.).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pinkflow">
            <Button size="lg">PinkFlow Validation</Button>
          </Link>
          <Link href="/report">
            <Button variant="outline" size="lg">View Reports</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
