import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserTokens } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { action, userId, email, name } = await request.json()

    if (action === "create_user") {
      await createUser(userId, email, name)
      return NextResponse.json({ success: true })
    }

    if (action === "get_tokens") {
      const balance = await getUserTokens(userId)
      return NextResponse.json({ balance })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
