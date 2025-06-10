"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Code, CheckCircle } from "lucide-react"

export function ThirdwebSetup() {
  const [clientId, setClientId] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    if (clientId) {
      setIsConnected(true)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Thirdweb Setup
        </CardTitle>
        <CardDescription>Configure Web3 features for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            {!isConnected ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-id">Thirdweb Client ID</Label>
                  <Input
                    id="client-id"
                    placeholder="Enter your Thirdweb client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Get your client ID from the Thirdweb dashboard</p>
                </div>
                <Button onClick={handleConnect} disabled={!clientId}>
                  Connect Thirdweb
                </Button>
              </div>
            ) : (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Thirdweb is connected and ready to use!</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Available Contracts</h4>
              <div className="space-y-2">
                {[
                  { name: "NFT Collection", type: "ERC721", status: "deployed" },
                  { name: "Token", type: "ERC20", status: "draft" },
                  { name: "Marketplace", type: "Custom", status: "deployed" },
                ].map((contract, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h5 className="font-medium">{contract.name}</h5>
                      <p className="text-sm text-muted-foreground">{contract.type}</p>
                    </div>
                    <Badge variant={contract.status === "deployed" ? "default" : "outline"}>{contract.status}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Deploy New Contract
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Integration Code</h4>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                <div className="text-green-600">// Install Thirdweb SDK</div>
                <div className="text-gray-600">npm install @thirdweb-dev/react @thirdweb-dev/sdk</div>
                <br />
                <div className="text-green-600">// Wrap your app</div>
                <div>import {"{ ThirdwebProvider }"} from "@thirdweb-dev/react"</div>
                <br />
                <div>export default function App() {"{"}</div>
                <div className="ml-4">return (</div>
                <div className="ml-8">{'<ThirdwebProvider clientId="your-client-id">'}</div>
                <div className="ml-12">{"<YourApp />"}</div>
                <div className="ml-8">{"</ThirdwebProvider>"}</div>
                <div className="ml-4">)</div>
                <div>{"}"}</div>
              </div>
              <Button variant="outline" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Copy Integration Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
