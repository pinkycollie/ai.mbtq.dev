import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MBTQ AI - Sign Language AI Platform",
  description: "Revolutionary AI-powered sign language interpretation with blockchain rewards - ai.mbtq.dev",
  keywords: ["sign language", "AI", "accessibility", "ASL", "blockchain", "MBTQ"],
  authors: [{ name: "Pinky", url: "https://ai.mbtq.dev" }],
  creator: "MBTQ AI",
  publisher: "MBTQ AI",
  metadataBase: new URL("https://ai.mbtq.dev"),
  openGraph: {
    title: "MBTQ AI - Sign Language AI Platform",
    description: "Revolutionary AI-powered sign language interpretation with blockchain rewards",
    url: "https://ai.mbtq.dev",
    siteName: "MBTQ AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MBTQ AI - Sign Language AI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTQ AI - Sign Language AI Platform",
    description: "Revolutionary AI-powered sign language interpretation with blockchain rewards",
    images: ["/og-image.png"],
    creator: "@mbtqai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ai.mbtq.dev" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <div className="flex-1">{children}</div>
              <footer className="border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} MBTQ AI - ai.mbtq.dev. All rights reserved.
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
