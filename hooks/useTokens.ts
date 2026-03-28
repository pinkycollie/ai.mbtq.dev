"use client"

import { useState, useEffect } from "react"

export function useTokens(userId?: string) {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchBalance = async () => {
    if (!userId) {
      setBalance(0)
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get_tokens",
          userId: userId,
        }),
      })

      const data = await response.json()
      setBalance(data.balance || 0)
    } catch (error) {
      console.error("Error fetching token balance:", error)
      setBalance(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [userId])

  const refreshBalance = () => {
    fetchBalance()
  }

  return {
    balance,
    loading,
    refreshBalance,
  }
}
