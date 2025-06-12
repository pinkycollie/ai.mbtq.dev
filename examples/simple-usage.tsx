"use client"

import { useState } from "react"
import { Splash } from "../components/splash"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleUsageExample() {
  const [fundingStatus, setFundingStatus] = useState<"funded" | "not-funded" | "needs-funding">("needs-funding")

  const cycleFundingStatus = () => {
    if (fundingStatus === "needs-funding") {
      setFundingStatus("funded")
    } else if (fundingStatus === "funded") {
      setFundingStatus("not-funded")
    } else {
      setFundingStatus("needs-funding")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Simple SPLASH! Usage Example</h1>

      <Splash status={fundingStatus} onClick={cycleFundingStatus} />

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Current status: <span className="font-bold">{fundingStatus.replace("-", " ")}</span>
          </p>
          <Button onClick={cycleFundingStatus}>Change Status</Button>
        </CardContent>
      </Card>
    </div>
  )
}
