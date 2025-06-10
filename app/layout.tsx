import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./accessibility.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { VisualNotificationProvider } from "@/components/visual-notification-provider"
import { AccessibilityHelper } from "@/components/accessibility-helper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Super Developer Platform | AI-Powered Development",
  description: "Build, deploy, and manage your applications faster with AI-powered development tools.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to content link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <VisualNotificationProvider>
            <SidebarProvider>
              <main id="main-content">{children}</main>
              <Toaster />
              <AccessibilityHelper />
            </SidebarProvider>
          </VisualNotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
