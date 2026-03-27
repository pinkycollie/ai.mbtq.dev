import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Activity } from "lucide-react"

export function InvestmentCTA() {
  return (
    <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-pink-600" />
          PinkFlow AI Platform
        </CardTitle>
        <CardDescription className="text-lg">Validation, Reporting & Sync Estimation for MBTQ AI</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">PinkFlow</div>
            <div className="text-sm text-muted-foreground">Validation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">Reports</div>
            <div className="text-sm text-muted-foreground">Analytics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">PinkSync</div>
            <div className="text-sm text-muted-foreground">Estimator</div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">
          Comprehensive tools for validating sign language AI workflows, generating reports, and estimating sync resources. Supporting ASL, BSL, LSRD and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pinkflow">
            <Button className="group">
              <Activity className="mr-2 h-4 w-4" />
              Open PinkFlow
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/report">
            <Button variant="outline">View Reports</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
