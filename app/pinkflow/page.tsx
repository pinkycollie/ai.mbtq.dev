import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, Shield, Zap, Activity } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PinkFlow Validation | MBTQ AI Platform",
  description: "AI workflow validation and quality assurance for sign language processing pipelines",
}

export default function PinkFlowPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">PinkFlow Validation</h1>
          <p className="text-lg text-muted-foreground">
            AI-powered workflow validation and quality assurance for sign language processing pipelines
          </p>
        </div>

        {/* Validation Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Passed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">24</div>
              <p className="text-sm text-green-600">Validations passed</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <Clock className="h-5 w-5" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700">3</div>
              <p className="text-sm text-yellow-600">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                Failed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">1</div>
              <p className="text-sm text-red-600">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Validation Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Validation Pipeline Features</CardTitle>
            <CardDescription>
              Comprehensive validation for generative AI workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Sign Language Accuracy Validation</h3>
                <p className="text-muted-foreground">
                  Validates ASL, BSL, LSF, DGS, JSL, Auslan, and LSRD translations against verified datasets.
                  Ensures gesture recognition accuracy meets quality thresholds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Real-time Processing Validation</h3>
                <p className="text-muted-foreground">
                  Monitors video processing pipeline performance, ensuring low-latency responses
                  for real-time sign language interpretation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Activity className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Model Performance Metrics</h3>
                <p className="text-muted-foreground">
                  Tracks language model performance, confidence scores, and translation quality
                  across all supported sign languages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/report">
            <Button size="lg">View Reports</Button>
          </Link>
          <Link href="/pinksync-estimator">
            <Button variant="outline" size="lg">PinkSync Estimator</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
