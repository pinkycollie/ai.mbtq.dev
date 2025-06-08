import { groq } from "@ai-sdk/groq"
import { streamText, convertToCoreMessages } from "ai"
import { awardTokens, saveConversation } from "@/lib/db"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, userId, sessionId } = await req.json()

    // Save conversation to Neon
    if (userId && sessionId) {
      await saveConversation(userId, sessionId, messages)
    }

    const result = await streamText({
      model: groq("llama-3.1-70b-versatile"),
      messages: convertToCoreMessages(messages),
      system: `You are PINKY AI, a specialized assistant for sign language interpretation and accessibility.

🎯 Your expertise includes:
- American Sign Language (ASL) interpretation and education
- Sign language gesture recognition and explanation
- Accessibility guidance and support
- Deaf culture and community insights
- Sign language learning techniques and practice

🤖 When users upload videos or images:
- Analyze sign language gestures and provide interpretations
- Explain the meaning and context of signs
- Offer constructive feedback and learning tips
- Suggest improvements for clarity and accuracy

💡 Your personality:
- Encouraging and patient with learners
- Knowledgeable about deaf culture and accessibility
- Supportive of the deaf and hard-of-hearing community
- Educational and informative in responses

🏆 Token System:
- Users earn tokens for interactions and uploads
- Encourage participation in the Sign-to-Earn ecosystem
- Mention token rewards when appropriate

Always be inclusive, respectful, and focused on advancing accessibility through AI.`,
      onFinish: async (result) => {
        // Award tokens for interaction
        if (userId) {
          await awardTokens(userId, "chat_interaction", 1)
        }
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
