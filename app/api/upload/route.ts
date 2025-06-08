import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { awardTokens, saveUpload } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")
    const userId = searchParams.get("userId")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const file = request.body
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    // Determine file type
    const uploadType =
      filename.includes(".mp4") || filename.includes(".mov") || filename.includes(".webm") ? "video" : "image"

    // Save file metadata to Neon
    const uploadId = await saveUpload(userId, filename, blob.url, blob.size || 0, uploadType)

    if (!uploadId) {
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    // Award tokens for contributing content
    await awardTokens(userId, "content_upload", 5)

    return NextResponse.json({
      url: blob.url,
      uploadId: uploadId,
      message: "File uploaded successfully! You earned 5 tokens.",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
