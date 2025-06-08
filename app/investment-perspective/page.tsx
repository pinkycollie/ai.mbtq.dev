import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Coins, Code, Database, FileVideo, Globe, MessageSquare, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Investment Perspective | Pinky's AI Projects",
  description: "Investment opportunity for a revolutionary sign language AI chatbot with blockchain integration",
}

export default function InvestmentPerspective() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Investment Perspective</h1>
          <h2 className="text-2xl font-semibold mb-6 text-primary">Sign Language AI Chatbot Platform</h2>
          <p className="text-lg text-muted-foreground">
            A revolutionary AI-powered platform bridging communication gaps through sign language interpretation with
            blockchain-based incentives
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <iframe
              src="https://pinkycollie-sign-language-ai-bot.static.hf.space"
              frameBorder="0"
              width="100%"
              height="450"
              className="rounded-lg shadow-lg"
              title="Sign Language AI Bot Demo"
            ></iframe>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="functionality">Functionality</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="usp">USP</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  Revolutionizing accessibility through AI-powered sign language interpretation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our Sign Language AI Chatbot platform represents a groundbreaking approach to accessibility, combining
                  advanced AI technology with blockchain incentives to create a self-sustaining ecosystem for sign
                  language interpretation and assistance.
                </p>
                <p>
                  By leveraging machine learning, computer vision, and a token-based reward system, we're building a
                  platform that not only serves the deaf and hard-of-hearing community but also creates economic
                  opportunities for contributors and partners.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="functionality" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Functionality</CardTitle>
                <CardDescription>AI-powered sign language interpretation and assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Real-time Sign Language Interpretation</h3>
                    <p className="text-muted-foreground">
                      Our AI model translates sign language gestures into text and speech in real-time, enabling
                      seamless communication between signers and non-signers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Multi-dialect Support</h3>
                    <p className="text-muted-foreground">
                      The platform recognizes various sign language dialects, including American Sign Language (ASL),
                      British Sign Language (BSL), and others, with plans to expand language coverage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Contextual Understanding</h3>
                    <p className="text-muted-foreground">
                      The AI chatbot understands context and can maintain coherent conversations, making it suitable for
                      customer service, educational settings, and everyday communication.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customization & Datasets</CardTitle>
                <CardDescription>Specialized training for diverse industry applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Database className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Preset Industry Datasets</h3>
                    <p className="text-muted-foreground">
                      Our platform comes with pre-trained datasets for sign language interpretation across multiple
                      industries, including:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Financial services (banking, insurance, investments)</li>
                      <li>Real estate and mortgage lending</li>
                      <li>Healthcare and medical services</li>
                      <li>Retail and e-commerce</li>
                      <li>Employment and human resources</li>
                      <li>Government and public services</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FileVideo className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Dataset Expansion Process</h3>
                    <p className="text-muted-foreground">Our platform continuously improves through:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>User-contributed video content of sign language interactions</li>
                      <li>Professional interpreter recordings for specialized terminology</li>
                      <li>Integration of existing sign language resources and dictionaries</li>
                      <li>Automated learning from customer service interactions</li>
                      <li>Curated YouTube content with proper sign language demonstrations</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">AWS GenASL Integration</h3>
                    <p className="text-muted-foreground">
                      Our platform integrates with Amazon's GenASL (Generative AI-powered American Sign Language
                      avatars) to provide enhanced ASL avatar animations. This integration leverages:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Amazon Transcribe for speech-to-text conversion</li>
                      <li>Amazon SageMaker for machine learning model deployment</li>
                      <li>Amazon Bedrock for foundation model capabilities</li>
                      <li>AWS Step Functions for workflow orchestration</li>
                      <li>Real-time ASL avatar generation from text and speech inputs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usp" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Unique Selling Proposition</CardTitle>
                <CardDescription>Blockchain integration and token rewards system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Coins className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Token-Based Incentive System</h3>
                    <p className="text-muted-foreground">
                      Our platform introduces a revolutionary "Sign-to-Earn" model where users receive token rewards
                      for:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Contributing sign language videos to expand our datasets</li>
                      <li>Validating and correcting AI interpretations</li>
                      <li>Recording customer service interactions with permission</li>
                      <li>Sharing relevant educational content</li>
                      <li>Participating in specialized training for industry-specific terminology</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Blockchain Verification</h3>
                    <p className="text-muted-foreground">
                      All contributions are verified and recorded on the blockchain, ensuring:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Transparent attribution for content creators</li>
                      <li>Secure and immutable record of contributions</li>
                      <li>Fair distribution of rewards based on quality and usage</li>
                      <li>Protection against fraudulent contributions</li>
                      <li>Clear audit trail for enterprise clients</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>API Features</CardTitle>
                <CardDescription>Comprehensive integration capabilities for businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Code className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Sign-to-Earn API</h3>
                    <p className="text-muted-foreground">
                      Enables businesses to implement token rewards for users who contribute sign language content,
                      creating a self-sustaining ecosystem of continuous improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Customer Service Integration</h3>
                    <p className="text-muted-foreground">
                      Seamlessly integrates with existing customer service platforms (Zendesk, Intercom, etc.) to
                      provide real-time sign language interpretation for customer support interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FileVideo className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">YouTube oEmbed</h3>
                    <p className="text-muted-foreground">
                      Allows for easy embedding of YouTube videos with sign language content, automatically processing
                      and integrating them into the platform's learning database.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Additional APIs in Development</h3>
                    <p className="text-muted-foreground">Our roadmap includes specialized APIs for:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Educational institutions to create custom sign language learning modules</li>
                      <li>Healthcare providers for medical sign language interpretation</li>
                      <li>Government services for accessibility compliance</li>
                      <li>E-commerce platforms for accessible customer experiences</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Highlights</CardTitle>
                <CardDescription>Key benefits and potential returns for investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Market Opportunity</h3>
                  <p className="text-muted-foreground">
                    The global market for accessibility progresses is projected to reach $50 billion by 2027, with sign
                    language interpretation services representing a significant growth segment. Our platform addresses
                    both compliance requirements and genuine communication needs.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Competitive Advantage</h3>
                  <p className="text-muted-foreground">
                    Our unique combination of AI technology and blockchain incentives creates a self-improving platform
                    that outpaces traditional progresses in both accuracy and scalability. The token economy creates
                    network effects that accelerate adoption and improvement.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Revenue Streams</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>SaaS subscriptions for business integrations</li>
                    <li>API usage fees for high-volume enterprise clients</li>
                    <li>Custom dataset development for specialized industries</li>
                    <li>Token economy transaction fees</li>
                    <li>Premium features for professional interpreters</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Funding Needs</h3>
                  <p className="text-muted-foreground mb-2">
                    We are seeking $45,000 in initial funding to accelerate development and market entry, with potential
                    for additional funding rounds as we scale. The funding will be allocated to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>AI model refinement and expansion: $15,000</li>
                    <li>Blockchain integration and token system development: $12,000</li>
                    <li>API development and third-party integrations: $8,000</li>
                    <li>Initial marketing and business development: $7,000</li>
                    <li>Legal and compliance: $3,000</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Projected Returns</h3>
                  <p className="text-muted-foreground">
                    Based on our market analysis and growth projections, we anticipate reaching profitability within 18
                    months of launch, with potential for 5-7x return on investment within 3-5 years through either
                    acquisition or continued growth and revenue sharing.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Detailed Investment Prospectus</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-4">
            For more information about investing in our Sign Language AI Chatbot platform, please contact:
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> invest@signlanguageai.com
            </p>
            <p>
              <strong>Phone:</strong> (817) 886-2798
            </p>
            <p>
              <strong>Schedule a Demo:</strong> calendly.com/signlanguageai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
