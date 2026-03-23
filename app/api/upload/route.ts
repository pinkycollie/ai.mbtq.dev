import { type NextRequest, NextResponse } from "next/server"
import { awardTokens, saveUpload } from "@/lib/db"
import fs from 'fs'
import path from 'path'

// Upload directory (in production, use S3 or similar object storage)
const UPLOAD_DIR = process.env.UPLOAD_DIR || './data/uploads'

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

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${filename}`
    
    // In production with Docker, use object storage (S3, MinIO, etc.)
    // For local development, we'll use a mock URL approach
    const fileUrl = `/api/files/${uniqueFilename}`
    const fileSize = 0 // Would be calculated from actual file

    // Determine file type
    const uploadType =
      filename.includes(".mp4") || filename.includes(".mov") || filename.includes(".webm") ? "video" : "image"

    // Save file metadata to database
    const uploadId = await saveUpload(userId, uniqueFilename, fileUrl, fileSize, uploadType)

    if (!uploadId) {
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    // Award tokens for contributing content
    await awardTokens(userId, "content_upload", 5)

    return NextResponse.json({
      url: fileUrl,
      uploadId: uploadId,
      message: "File uploaded successfully! You earned 5 tokens.",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
