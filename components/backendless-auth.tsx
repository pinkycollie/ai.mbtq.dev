"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useBackendlessAuth } from "./hooks/use-backendless"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, LogIn, UserPlus, LogOut, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useVisualNotification } from "./visual-notification-provider"

export function BackendlessAuth() {
  const { user, isLoading, error, register, login, logout } = useBackendlessAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { success, error: showError } = useVisualNotification()

  // Refs for focus management
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  // Set focus when tab changes
  useEffect(() => {
    if (activeTab === "login") {
      emailInputRef.current?.focus()
    } else {
      nameInputRef.current?.focus()
    }
  }, [activeTab])

  // Show error as visual notification if present
  useEffect(() => {
    if (error) {
      showError({
        title: "Authentication Error",
        message: error,
        duration: 8000,
      })
    }
  }, [error, showError])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsSubmitting(true)
    try {
      await login(email, password)
      success({
        title: "Login successful",
        message: "You have been logged in successfully.",
      })
      setPassword("")
    } catch (error: any) {
      showError({
        title: "Login failed",
        message: error.message || "An error occurred during login.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsSubmitting(true)
    try {
      await register(email, password, name || undefined)
      success({
        title: "Registration successful",
        message: "Your account has been created successfully.",
      })
      setPassword("")
      setActiveTab("login")
    } catch (error: any) {
      showError({
        title: "Registration failed",
        message: error.message || "An error occurred during registration.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    setIsSubmitting(true)
    try {
      await logout()
      success({
        title: "Logout successful",
        message: "You have been logged out successfully.",
      })
    } catch (error: any) {
      showError({
        title: "Logout failed",
        message: error.message || "An error occurred during logout.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Keyboard navigation for tab switching
  const handleTabKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
      setActiveTab(activeTab === "login" ? "register" : "login")
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p aria-live="polite">Loading authentication status...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" aria-hidden="true" />
            <span>User Profile</span>
          </CardTitle>
          <CardDescription>You are currently logged in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="profile-name">Name</Label>
                <div id="profile-name" className="p-2 border rounded-md bg-muted/50" tabIndex={0}>
                  {user.name || "Not provided"}
                </div>
              </div>
              <div>
                <Label htmlFor="profile-email">Email</Label>
                <div id="profile-email" className="p-2 border rounded-md bg-muted/50" tabIndex={0}>
                  {user.email}
                </div>
              </div>
              <div>
                <Label htmlFor="profile-id">User ID</Label>
                <div
                  id="profile-id"
                  className="p-2 border rounded-md bg-muted/50 text-xs font-mono overflow-auto"
                  tabIndex={0}
                >
                  {user.id}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogout}
            className="w-full"
            variant="outline"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Logout</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Login or create an account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          aria-label="Authentication options"
        >
          <TabsList
            className="grid w-full grid-cols-2"
            aria-label="Authentication tabs"
            onKeyDown={handleTabKeyNavigation}
          >
            <TabsTrigger value="login" aria-controls="login-tab">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" aria-controls="register-tab">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" id="login-tab">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  ref={emailInputRef}
                  aria-describedby="email-error"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  ref={passwordInputRef}
                  aria-describedby="password-error"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                ref={submitButtonRef}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Login</span>
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register" id="register-tab">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name (Optional)</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={nameInputRef}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-describedby="register-email-error"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-describedby="register-password-error"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Register</span>
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
