"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project-card"
import { InvestmentCTA } from "@/components/investment-cta"
import { Brain, Coins, Globe, Users, Video, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Now Live at ai.mbtq.dev
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            MBTQ AI Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Revolutionary AI-powered sign language interpretation with blockchain rewards. Bridging communication gaps
            through Mind, Business, Tech, and Quantum perspectives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {session ? (
              <>
                <Link href="/chat">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Start AI Chat
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    View Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Live Demo */}
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://pinkycollie-sign-language-ai-bot.static.hf.space"
                frameBorder="0"
                width="100%"
                height="100%"
                className="absolute inset-0 rounded"
                title="MBTQ AI - Sign Language AI Model"
                allow="accelerometer; camera; microphone; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              ↑ Try our live AI model above - Upload sign language videos or ask questions!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose MBTQ AI?</h2>
            <p className="text-xl text-muted-foreground">
              The most advanced sign language AI platform with unique blockchain integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>AI-Powered Interpretation</CardTitle>
                <CardDescription>
                  Real-time sign language recognition using advanced computer vision and machine learning
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Coins className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
                <CardTitle>Sign-to-Earn Economy</CardTitle>
                <CardDescription>
                  Earn tokens for every interaction, upload, and contribution to our growing dataset
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>AWS GenASL Integration</CardTitle>
                <CardDescription>
                  Powered by Amazon's Generative AI for expressive ASL avatar animations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Deaf-First Approach</CardTitle>
                <CardDescription>
                  Built with and for the deaf community, ensuring authentic representation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Video className="h-12 w-12 mx-auto text-red-600 mb-4" />
                <CardTitle>Multi-Modal Support</CardTitle>
                <CardDescription>
                  Support for video, image, and real-time camera input with high accuracy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 mx-auto text-orange-600 mb-4" />
                <CardTitle>Enterprise Ready</CardTitle>
                <CardDescription>
                  Scalable APIs for businesses, healthcare, education, and government sectors
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured AI Projects</h2>
            <p className="text-xl text-muted-foreground">Explore our cutting-edge AI solutions for accessibility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Sign Language AI Chatbot"
              description="Real-time AI-powered sign language interpretation with token rewards and AWS GenASL integration"
              href="/chat"
              imageUrl="/placeholder.svg?height=200&width=400&text=AI+Chatbot"
              genAslEnabled={true}
              genAslEndpoint="https://api.aws.amazon.com/genasl"
            />

            <ProjectCard
              title="Multi-Industry Datasets"
              description="Specialized sign language datasets for healthcare, finance, legal, and educational sectors"
              href="/projects/datasets"
              imageUrl="/placeholder.svg?height=200&width=400&text=Datasets"
            />

            <ProjectCard
              title="API Integration Platform"
              description="Enterprise APIs for seamless integration with existing business applications"
              href="/projects/api"
              imageUrl="/placeholder.svg?height=200&width=400&text=API+Platform"
            />
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <InvestmentCTA />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Welcome Tokens</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Sign Languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-100">Industry Datasets</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the revolution in AI-powered accessibility at ai.mbtq.dev
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Create Free Account
              </Button>
            </Link>
            <Link href="/pinkflow">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                PinkFlow Validation
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              🌐 Live at: <strong>ai.mbtq.dev</strong>
            </p>
            <p>
              📧 Contact: <strong>invest@signlanguageai.com</strong>
            </p>
            <p>
              📞 Phone: <strong>(817) 886-2798</strong>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
