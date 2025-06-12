"use client"

import { Splash } from "../components/splash"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Star, Zap } from "lucide-react"

export default function MultipleSplashesExample() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Multiple SPLASH! Components Example</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative h-64">
          <CardHeader>
            <CardTitle>Project Alpha</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This project is fully funded and ready to go!</p>
          </CardContent>
          <Splash status="funded" position="top-right" />
        </Card>

        <Card className="relative h-64">
          <CardHeader>
            <CardTitle>Project Beta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This project needs additional funding to continue.</p>
          </CardContent>
          <Splash status="needs-funding" position="top-right" pulse={true} />
        </Card>

        <Card className="relative h-64">
          <CardHeader>
            <CardTitle>Project Gamma</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This project was not approved for funding.</p>
          </CardContent>
          <Splash status="not-funded" position="top-right" />
        </Card>

        <Card className="relative h-64">
          <CardHeader>
            <CardTitle>Custom Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This project has custom splash indicators.</p>
            <div className="mt-4 flex gap-2">
              <Splash
                text="POPULAR"
                color="bg-purple-500"
                position="bottom-left"
                size="small"
                icon={<Heart className="h-4 w-4" />}
              />
              <Splash
                text="FEATURED"
                color="bg-blue-500"
                position="bottom-left"
                size="small"
                icon={<Star className="h-4 w-4" />}
                className="ml-24"
              />
              <Splash
                text="NEW"
                color="bg-emerald-500"
                position="bottom-left"
                size="small"
                icon={<Zap className="h-4 w-4" />}
                className="ml-48"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
