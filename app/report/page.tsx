import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Reports | MBTQ AI Platform",
  description: "Analytics and reporting dashboard for sign language AI platform performance",
}

export default function ReportPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Reports & Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analytics and performance reports for the MBTQ AI Platform
          </p>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Usage Analytics
              </CardTitle>
              <CardDescription>Platform usage and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Daily active users</li>
                <li>• Translation requests</li>
                <li>• API call volume</li>
                <li>• Session duration</li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-green-600" />
                Language Distribution
              </CardTitle>
              <CardDescription>Sign language usage breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• ASL: 45%</li>
                <li>• BSL: 25%</li>
                <li>• LSRD: 12%</li>
                <li>• Other: 18%</li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Performance Metrics
              </CardTitle>
              <CardDescription>AI model performance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Accuracy rate: 94.2%</li>
                <li>• Avg response time: 120ms</li>
                <li>• Error rate: 0.8%</li>
                <li>• Uptime: 99.9%</li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Reports
            </CardTitle>
            <CardDescription>Generated reports from the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Monthly Performance Summary", date: "Dec 1, 2024", type: "PDF" },
                { name: "Sign Language Usage Report", date: "Nov 28, 2024", type: "CSV" },
                { name: "API Integration Analysis", date: "Nov 25, 2024", type: "PDF" },
                { name: "Accessibility Compliance Report", date: "Nov 20, 2024", type: "PDF" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pinkflow">
            <Button size="lg">PinkFlow Validation</Button>
          </Link>
          <Link href="/pinksync-estimator">
            <Button variant="outline" size="lg">PinkSync Estimator</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
