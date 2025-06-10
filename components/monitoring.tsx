import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps } from "@/components/ui/steps"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Monitoring() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Monitoring and Analytics</CardTitle>
          <CardDescription>
            Learn how to monitor your application's performance and analyze user behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Vercel Analytics</Steps.Title>
                <Steps.Description>Privacy-friendly analytics for your web application</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>
                  Vercel Analytics provides insights into your application's performance and user behavior without
                  compromising user privacy [^2].
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Setting up Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to your project in the Vercel dashboard</li>
                        <li>Navigate to "Analytics"</li>
                        <li>Click "Enable Analytics"</li>
                        <li>Follow the instructions to add the required code to your application</li>
                      </ol>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">What You Can Track</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Page views and unique visitors</li>
                        <li>Traffic sources and referrers</li>
                        <li>User location and device information</li>
                        <li>Core Web Vitals and performance metrics</li>
                        <li>Custom events</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Logging and error tracking</Steps.Title>
                <Steps.Description>Monitor your application's logs and errors</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <Tabs defaultValue="logs" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="logs">Vercel Logs</TabsTrigger>
                    <TabsTrigger value="integration">Third-party Integration</TabsTrigger>
                    <TabsTrigger value="custom">Custom Error Handling</TabsTrigger>
                  </TabsList>
                  <TabsContent value="logs" className="mt-4 space-y-4">
                    <p>Vercel provides built-in logging for your applications:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to your project in the Vercel dashboard</li>
                      <li>Navigate to "Logs"</li>
                      <li>Filter logs by deployment, date, or type</li>
                      <li>Search for specific log messages</li>
                    </ol>
                    <p>You can also access logs via the CLI:</p>
                    <CodeBlock
                      language="bash"
                      code="# View logs for a specific deployment
vercel logs [deployment-url]

# Stream logs in real-time
vercel logs --follow"
                    />
                  </TabsContent>
                  <TabsContent value="integration" className="mt-4 space-y-4">
                    <p>Vercel integrates with popular error tracking services:</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Sentry Integration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <CodeBlock
                            language="javascript"
                            code="// Install Sentry
npm install @sentry/nextjs

// Configure in next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // your next config
};

module.exports = withSentryConfig(nextConfig);"
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Datadog Integration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <CodeBlock
                            language="javascript"
                            code="// Install Datadog
npm install @datadog/browser-rum

// Initialize in your app
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: 'YOUR_APP_ID',
  clientToken: 'YOUR_CLIENT_TOKEN',
  site: 'datadoghq.com',
  service: 'your-app-name',
});"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="custom" className="mt-4 space-y-4">
                    <p>You can implement custom error handling in your application:</p>
                    <CodeBlock
                      language="javascript"
                      code="// Next.js error handling
// pages/_error.js or app/error.js
export default function CustomError({ statusCode, err }) {
  // Log the error to your preferred service
  console.error(err);
  
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Sorry, something went wrong</p>
    </div>
  );
}

// For API routes
export default function handler(req, res) {
  try {
    // Your API logic
  } catch (error) {
    // Log the error
    console.error(error);
    
    // Return an error response
    res.status(500).json({ error: 'Something went wrong' });
  }
}"
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Performance monitoring</Steps.Title>
                <Steps.Description>Track and optimize your application's performance</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>Vercel provides tools to monitor and improve your application's performance:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Core Web Vitals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Vercel Analytics tracks Core Web Vitals metrics:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>LCP (Largest Contentful Paint)</strong>: Loading performance
                        </li>
                        <li>
                          <strong>FID (First Input Delay)</strong>: Interactivity
                        </li>
                        <li>
                          <strong>CLS (Cumulative Layout Shift)</strong>: Visual stability
                        </li>
                        <li>
                          <strong>TTFB (Time to First Byte)</strong>: Server response time
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Speed Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Vercel Speed Insights provides detailed performance data:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Real user monitoring (RUM) data</li>
                        <li>Performance breakdown by page</li>
                        <li>Performance by device and connection type</li>
                        <li>Historical performance trends</li>
                      </ul>
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

