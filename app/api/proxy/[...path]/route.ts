import { type NextRequest, NextResponse } from "next/server"

// Get the API URL from environment variables or use a default
const getApiUrl = () => {
  return process.env.FASTAPI_URL || process.env.API_URL || process.env.BACKEND_URL || "http://localhost:8000"
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const apiUrl = getApiUrl()
  const url = new URL(`${apiUrl}/api/${path}`)

  // Forward query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch data from API" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const apiUrl = getApiUrl()
  const url = new URL(`${apiUrl}/api/${path}`)

  try {
    const body = await request.json()
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API proxy error:", error)
    return NextResponse.json({ error: "Failed to post data to API" }, { status: 500 })
  }
}

// Implement other HTTP methods (PUT, DELETE, etc.) similarly
export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const apiUrl = getApiUrl()
  const url = new URL(`${apiUrl}/api/${path}`)

  try {
    const body = await request.json()
    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API proxy error:", error)
    return NextResponse.json({ error: "Failed to update data in API" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const apiUrl = getApiUrl()
  const url = new URL(`${apiUrl}/api/${path}`)

  try {
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API proxy error:", error)
    return NextResponse.json({ error: "Failed to delete data in API" }, { status: 500 })
  }
}
