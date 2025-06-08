import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, deafCommunityMember, preferredSignLanguage } = await request.json()

    // Check if user already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password (in production, you'd want proper password hashing)
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const userId = crypto.randomUUID()
    await sql`
      INSERT INTO users (
        id, name, email, deaf_community_member, preferred_sign_language, created_at
      ) VALUES (
        ${userId}, ${name}, ${email}, ${deafCommunityMember}, ${preferredSignLanguage}, NOW()
      )
    `

    // Award welcome bonus
    await sql`SELECT award_user_tokens(${userId}, 'welcome_bonus', 25, 'Welcome to Sign Language AI!')`

    return NextResponse.json({ success: true, userId })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
