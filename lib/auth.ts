import type { NextAuthOptions } from "next-auth"
import type { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { sql } from "@/lib/db"

// Custom Neon adapter for NextAuth
function NeonAdapter(): Adapter {
  return {
    async createUser(user) {
      const id = crypto.randomUUID()
      await sql`
        INSERT INTO users (id, name, email, email_verified, image)
        VALUES (${id}, ${user.name}, ${user.email}, ${user.emailVerified}, ${user.image})
      `

      // Award welcome bonus
      await sql`SELECT award_user_tokens(${id}, 'welcome_bonus', 25, 'Welcome to Sign Language AI!')`

      const newUser = await sql`SELECT * FROM users WHERE id = ${id}`
      return {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        emailVerified: newUser[0].email_verified,
        image: newUser[0].image,
      }
    },

    async getUser(id) {
      const user = await sql`SELECT * FROM users WHERE id = ${id}`
      if (!user[0]) return null
      return {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        emailVerified: user[0].email_verified,
        image: user[0].image,
      }
    },

    async getUserByEmail(email) {
      const user = await sql`SELECT * FROM users WHERE email = ${email}`
      if (!user[0]) return null
      return {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        emailVerified: user[0].email_verified,
        image: user[0].image,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await sql`
        SELECT u.* FROM users u
        JOIN accounts a ON u.id = a.user_id
        WHERE a.provider = ${provider} AND a.provider_account_id = ${providerAccountId}
      `
      if (!account[0]) return null
      return {
        id: account[0].id,
        name: account[0].name,
        email: account[0].email,
        emailVerified: account[0].email_verified,
        image: account[0].image,
      }
    },

    async updateUser(user) {
      await sql`
        UPDATE users 
        SET name = ${user.name}, email = ${user.email}, image = ${user.image}, updated_at = NOW()
        WHERE id = ${user.id}
      `
      const updatedUser = await sql`SELECT * FROM users WHERE id = ${user.id}`
      return {
        id: updatedUser[0].id,
        name: updatedUser[0].name,
        email: updatedUser[0].email,
        emailVerified: updatedUser[0].email_verified,
        image: updatedUser[0].image,
      }
    },

    async linkAccount(account) {
      await sql`
        INSERT INTO accounts (
          user_id, type, provider, provider_account_id, 
          refresh_token, access_token, expires_at, token_type, scope, id_token
        ) VALUES (
          ${account.userId}, ${account.type}, ${account.provider}, ${account.providerAccountId},
          ${account.refresh_token}, ${account.access_token}, ${account.expires_at}, 
          ${account.token_type}, ${account.scope}, ${account.id_token}
        )
      `
    },

    async createSession({ sessionToken, userId, expires }) {
      await sql`
        INSERT INTO sessions (session_token, user_id, expires)
        VALUES (${sessionToken}, ${userId}, ${expires})
      `
      return { sessionToken, userId, expires }
    },

    async getSessionAndUser(sessionToken) {
      const result = await sql`
        SELECT s.*, u.* FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = ${sessionToken}
      `
      if (!result[0]) return null

      return {
        session: {
          sessionToken: result[0].session_token,
          userId: result[0].user_id,
          expires: result[0].expires,
        },
        user: {
          id: result[0].user_id,
          name: result[0].name,
          email: result[0].email,
          emailVerified: result[0].email_verified,
          image: result[0].image,
        },
      }
    },

    async updateSession({ sessionToken, expires }) {
      await sql`
        UPDATE sessions 
        SET expires = ${expires}
        WHERE session_token = ${sessionToken}
      `
      return { sessionToken, expires }
    },

    async deleteSession(sessionToken) {
      await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`
    },

    async createVerificationToken({ identifier, expires, token }) {
      await sql`
        INSERT INTO verification_tokens (identifier, token, expires)
        VALUES (${identifier}, ${token}, ${expires})
      `
      return { identifier, token, expires }
    },

    async useVerificationToken({ identifier, token }) {
      const result = await sql`
        DELETE FROM verification_tokens 
        WHERE identifier = ${identifier} AND token = ${token}
        RETURNING *
      `
      if (!result[0]) return null
      return {
        identifier: result[0].identifier,
        token: result[0].token,
        expires: result[0].expires,
      }
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: NeonAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await sql`
          SELECT * FROM users WHERE email = ${credentials.email}
        `

        if (!user[0]) {
          return null
        }

        // For demo purposes, we'll accept any password
        // In production, you'd verify the hashed password
        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          image: user[0].image,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }

      // Update last login
      if (session.user.id) {
        await sql`
          UPDATE users 
          SET last_login = NOW() 
          WHERE id = ${session.user.id}
        `
      }

      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
}
