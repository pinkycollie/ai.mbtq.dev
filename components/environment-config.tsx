import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps } from "@/components/ui/steps"
import { CodeBlock } from "@/components/code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Lock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EnvironmentConfig() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Environment Configuration</CardTitle>
          <CardDescription>
            Learn how to manage environment variables and secrets for your Vercel projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Adding environment variables</Steps.Title>
                <Steps.Description>Configure environment variables for your project</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>You can add environment variables through the Vercel dashboard or using the CLI:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Using the Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to your project in the Vercel dashboard</li>
                        <li>Navigate to "Settings" → "Environment Variables"</li>
                        <li>Add your key-value pairs</li>
                        <li>Select which environments they apply to (Production, Preview, Development)</li>
                        <li>Click "Save"</li>
                      </ol>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Using the CLI</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CodeBlock
                        language="bash"
                        code="# Add a single environment variable
vercel env add MY_API_KEY

# Add from a .env file
vercel env pull
# Edit the .env file
vercel env push"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Environment variable types</Steps.Title>
                <Steps.Description>Understand the different types of environment variables</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Plain Text</TableCell>
                      <TableCell>Regular environment variables</TableCell>
                      <TableCell>
                        <code>API_URL=https://api.example.com</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Secrets</TableCell>
                      <TableCell>Sensitive values that are encrypted</TableCell>
                      <TableCell>
                        <code>API_KEY=*****</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>System Environment Variables</TableCell>
                      <TableCell>Automatically provided by Vercel</TableCell>
                      <TableCell>
                        <code>VERCEL_URL, VERCEL_ENV</code>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Security Best Practice</AlertTitle>
                  <AlertDescription>
                    Never commit sensitive environment variables to your repository. Always use Vercel's environment
                    variable management system.
                  </AlertDescription>
                </Alert>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Using environment variables in your code</Steps.Title>
                <Steps.Description>Access environment variables in different frameworks</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Next.js</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock
                        language="javascript"
                        code="// Server-side (API routes, getServerSideProps, etc.)
console.log(process.env.MY_API_KEY);

// Client-side (must be prefixed with NEXT_PUBLIC_)
console.log(process.env.NEXT_PUBLIC_API_URL);"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">React / Create React App</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock
                        language="javascript"
                        code="// Must be prefixed with REACT_APP_
console.log(process.env.REACT_APP_API_URL);"
                      />
                    </CardContent>
                  </Card>
                </div>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Client-side Variables</AlertTitle>
                  <AlertDescription>
                    Remember that environment variables used on the client-side will be visible to users. Never put
                    sensitive information in client-side environment variables.
                  </AlertDescription>
                </Alert>
              </div>
            </Steps.Step>
          </Steps>
        </CardContent>
      </Card>
    </div>
  )
}

