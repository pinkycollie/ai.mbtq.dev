import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, DollarSign, TrendingUp } from "lucide-react"

export function InvestmentCTA() {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          Investment Opportunity
        </CardTitle>
        <CardDescription className="text-lg">Join the $45,000 funding round for MBTQ AI at ai.mbtq.dev</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$45K</div>
            <div className="text-sm text-muted-foreground">Funding Goal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">5-7x</div>
            <div className="text-sm text-muted-foreground">Projected ROI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">18mo</div>
            <div className="text-sm text-muted-foreground">To Profitability</div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">
          Revolutionary Sign Language AI platform with blockchain integration, AWS GenASL technology, and a proven
          Sign-to-Earn economy. Live at <strong>ai.mbtq.dev</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/investment-perspective">
            <Button className="group">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Investment Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button variant="outline" asChild>
            <a href="mailto:invest@signlanguageai.com">Contact Investors</a>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">📧 invest@signlanguageai.com | 📞 (817) 886-2798</div>
      </CardContent>
    </Card>
  )
}
