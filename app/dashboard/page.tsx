"use client"

import { useAuth } from "@/hooks/useAuth"
import { useTokens } from "@/hooks/useTokens"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Upload, MessageSquare, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const { balance, loading } = useTokens(user?.id)

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name || user.email}!</h1>
        <p className="text-muted-foreground">Track your progress and earnings in the Sign Language AI ecosystem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <Coins className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : balance}</div>
            <p className="text-xs text-muted-foreground">+1 per chat, +5 per upload</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <Upload className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Sign language videos & images</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">AI conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Beginner</div>
            <p className="text-xs text-muted-foreground">Keep contributing to level up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start earning tokens with these activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/chat">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start AI Chat Session (+1 token per message)
              </Button>
            </Link>
            <Link href="/chat">
              <Button className="w-full justify-start" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Sign Language Content (+5 tokens)
              </Button>
            </Link>
            <Link href="/projects/sign-language-ai">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Project Details
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Economy</CardTitle>
            <CardDescription>How you can earn and use tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Welcome Bonus</span>
                <span className="font-semibold text-green-600">+10 tokens</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Chat Message</span>
                <span className="font-semibold text-blue-600">+1 token</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Video Upload</span>
                <span className="font-semibold text-purple-600">+5 tokens</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Content Validation</span>
                <span className="font-semibold text-orange-600">+3 tokens</span>
              </div>
              <hr className="my-2" />
              <p className="text-xs text-muted-foreground">
                Tokens will be convertible to cryptocurrency in our upcoming blockchain integration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
