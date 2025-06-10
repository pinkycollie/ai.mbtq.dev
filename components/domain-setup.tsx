import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps } from "@/components/ui/steps"
import { CodeBlock } from "@/components/code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DomainSetup() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Domain and SSL Setup</CardTitle>
          <CardDescription>Configure custom domains and SSL certificates for your Vercel projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Adding a custom domain</Steps.Title>
                <Steps.Description>Connect your own domain to your Vercel project</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <Tabs defaultValue="dashboard" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dashboard">Using Dashboard</TabsTrigger>
                    <TabsTrigger value="cli">Using CLI</TabsTrigger>
                  </TabsList>
                  <TabsContent value="dashboard" className="mt-4 space-y-4">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to your project in the Vercel dashboard</li>
                      <li>Navigate to "Settings" → "Domains"</li>
                      <li>Enter your domain name and click "Add"</li>
                      <li>Follow the verification instructions</li>
                    </ol>
                  </TabsContent>
                  <TabsContent value="cli" className="mt-4 space-y-4">
                    <CodeBlock
                      language="bash"
                      code="# Add a domain to your project
vercel domains add example.com"
                    />
                    <p>Follow the verification instructions in the CLI.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Domain verification methods</Steps.Title>
                <Steps.Description>Different ways to verify domain ownership</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">DNS Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Add a TXT record to your domain's DNS settings:</p>
                      <CodeBlock
                        language="text"
                        code="Type: TXT
Name: _vercel
Value: [verification-value-provided-by-vercel]"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Nameserver Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Change your domain's nameservers to Vercel's:</p>
                      <CodeBlock
                        language="text"
                        code="ns1.vercel-dns.com
ns2.vercel-dns.com"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        This gives Vercel full control over your domain's DNS settings.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>SSL certificate configuration</Steps.Title>
                <Steps.Description>Secure your domain with SSL/TLS</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>
                  Vercel automatically provisions and renews SSL certificates for all domains added to your projects.
                </p>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Automatic SSL</AlertTitle>
                  <AlertDescription>
                    Vercel uses Let's Encrypt to provide free SSL certificates that are automatically renewed before
                    expiration.
                  </AlertDescription>
                </Alert>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Custom Certificates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>You can also upload your own SSL certificates:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to your project in the Vercel dashboard</li>
                        <li>Navigate to "Settings" → "Domains"</li>
                        <li>Click on your domain</li>
                        <li>Select "Upload Certificate"</li>
                        <li>Provide your certificate, private key, and chain</li>
                      </ol>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Redirect Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        Configure redirects in your <code>vercel.json</code> file:
                      </p>
                      <CodeBlock
                        language="json"
                        code='{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    },
    {
      "source": "/blog/:slug",
      "destination": "/articles/:slug",
      "permanent": true
    }
  ]
}'
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Steps.Step>
          </Steps>
        </CardContent>
      </Card>
    </div>
  )
}

