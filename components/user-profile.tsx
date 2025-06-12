"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Edit, Settings, LogOut } from "lucide-react"

interface UserProfileProps {
  onClose: () => void
}

export function UserProfile({ onClose }: UserProfileProps) {
  return (
    <div className="w-80 bg-background border-l flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Profile</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* User Info */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80&text=YO" />
                <AvatarFallback className="text-2xl">YO</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>Your Name</CardTitle>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-xs">
                🟢 Online
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="you@mbtq.dev" readOnly />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value="Full Stack Developer" readOnly />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value="Engineering" readOnly />
            </div>
            <div>
              <Label htmlFor="stack">Tech Stack</Label>
              <Input id="stack" value="Next.js, Vercel, Thirdweb" readOnly />
            </div>
            <Button variant="outline" className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Commits this week</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">PRs reviewed</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deployments</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Member since</span>
              <span className="font-medium">Jan 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="status">Custom Status</Label>
              <Input id="status" placeholder="What's your status?" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                🟢 Available
              </Button>
              <Button variant="outline" size="sm">
                🟡 Away
              </Button>
              <Button variant="outline" size="sm">
                🔴 Busy
              </Button>
              <Button variant="outline" size="sm">
                ⚫ Offline
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button variant="outline" className="w-full">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button variant="outline" className="w-full text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
