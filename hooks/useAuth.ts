"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Simple demo auth - in production, use proper authentication
      const userId = btoa(email)
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, 8)
      const userData = { id: userId, email, name: email.split("@")[0] }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      // Create user in database
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_user",
          userId: userData.id,
          email: userData.email,
          name: userData.name,
        }),
      })

      return { error: null }
    } catch (error) {
      return { error: { message: "Sign in failed" } }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    return signIn(email, password) // Same as sign in for demo
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("user")
    return { error: null }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }
}
