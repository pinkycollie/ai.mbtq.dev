# Integration Guide: Sign Language Assistant ↔ Next.js Platform

This guide explains how to integrate the Sign Language Virtual Assistant with the existing ai.mbtq.dev Next.js platform.

## Overview

The Sign Language Assistant can be integrated with the Next.js platform in several ways:

1. **WebGL Build Embedding** - Embed Unity WebGL build in Next.js pages
2. **REST API Integration** - Connect Next.js backend to Python ML service
3. **Hybrid Approach** - Use both WebGL and REST API for full functionality

## Integration Options

### Option 1: Unity WebGL Embed (Recommended for MVP)

#### Step 1: Build Unity Project for WebGL

In Unity:
```
File → Build Settings → WebGL → Build
```

This creates a WebGL build folder with:
- `index.html`
- `Build/` folder with game files
- `TemplateData/` folder with assets

#### Step 2: Host WebGL Build

Place WebGL build in Next.js public directory:
```
public/
  └── unity-builds/
      └── sign-language-assistant/
          ├── index.html
          ├── Build/
          └── TemplateData/
```

#### Step 3: Create Next.js Component

Create `components/SignLanguageAssistant.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'

interface SignLanguageAssistantProps {
  width?: string
  height?: string
  onSignRecognized?: (sign: string, confidence: number) => void
}

export default function SignLanguageAssistant({
  width = '100%',
  height = '600px',
  onSignRecognized
}: SignLanguageAssistantProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Listen for messages from Unity
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'signRecognized' && onSignRecognized) {
        onSignRecognized(event.data.sign, event.data.confidence)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onSignRecognized])

  const sendToUnity = (message: any) => {
    iframeRef.current?.contentWindow?.postMessage(message, '*')
  }

  return (
    <div style={{ width, height }}>
      <iframe
        ref={iframeRef}
        src="/unity-builds/sign-language-assistant/index.html"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="camera; microphone; autoplay"
        title="Sign Language Assistant"
      />
    </div>
  )
}
```

#### Step 4: Use in Pages

In your Next.js page:

```typescript
// app/sign-assistant/page.tsx
'use client'

import SignLanguageAssistant from '@/components/SignLanguageAssistant'
import { useState } from 'react'

export default function SignAssistantPage() {
  const [recognizedSigns, setRecognizedSigns] = useState<string[]>([])

  const handleSignRecognized = (sign: string, confidence: number) => {
    console.log(`Recognized: ${sign} (${confidence})`)
    setRecognizedSigns(prev => [...prev, sign])
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Sign Language Assistant</h1>
      
      <SignLanguageAssistant
        width="100%"
        height="600px"
        onSignRecognized={handleSignRecognized}
      />

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Recognized Signs:</h2>
        <ul className="list-disc pl-6">
          {recognizedSigns.map((sign, index) => (
            <li key={index}>{sign}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

### Option 2: REST API Integration

#### Step 1: Create Next.js API Routes

Create `app/api/sign-recognition/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

// Store for recognized signs (use database in production)
const recognizedSigns: Array<{
  sign: string
  confidence: number
  timestamp: number
}> = []

export async function POST(request: NextRequest) {
  try {
    const { sign, confidence } = await request.json()

    // Validate input
    if (!sign || typeof confidence !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // Store recognition
    recognizedSigns.push({
      sign,
      confidence,
      timestamp: Date.now()
    })

    // Limit stored signs
    if (recognizedSigns.length > 100) {
      recognizedSigns.shift()
    }

    return NextResponse.json({
      success: true,
      sign,
      confidence
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    signs: recognizedSigns.slice(-10) // Return last 10 signs
  })
}
```

#### Step 2: Update Python Recognition Bridge

Modify `sign_recognition.py`:

```python
import requests

class SignRecognitionBridge:
    def __init__(self, model, nextjs_endpoint="http://localhost:3000"):
        self.model = model
        self.nextjs_endpoint = nextjs_endpoint
    
    def send_to_nextjs(self, sign: str, confidence: float):
        """Send recognition result to Next.js API"""
        try:
            response = requests.post(
                f"{self.nextjs_endpoint}/api/sign-recognition",
                json={
                    'sign': sign,
                    'confidence': confidence,
                    'timestamp': time.time()
                },
                timeout=5
            )
            
            if response.status_code == 200:
                print(f"Sent to Next.js: {sign} ({confidence:.2f})")
            else:
                print(f"Error sending to Next.js: {response.status_code}")
        except Exception as e:
            print(f"Failed to send to Next.js: {e}")
```

#### Step 3: Display Recognition Results

Create `components/SignRecognitionDisplay.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'

interface SignRecognition {
  sign: string
  confidence: number
  timestamp: number
}

export default function SignRecognitionDisplay() {
  const [signs, setSigns] = useState<SignRecognition[]>([])

  useEffect(() => {
    const fetchSigns = async () => {
      try {
        const response = await fetch('/api/sign-recognition')
        const data = await response.json()
        setSigns(data.signs)
      } catch (error) {
        console.error('Failed to fetch signs:', error)
      }
    }

    // Poll every 2 seconds
    const interval = setInterval(fetchSigns, 2000)
    fetchSigns() // Initial fetch

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Signs</h2>
      
      {signs.length === 0 ? (
        <p className="text-gray-500">No signs recognized yet...</p>
      ) : (
        <ul className="space-y-2">
          {signs.map((recognition, index) => (
            <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{recognition.sign}</span>
              <span className="text-sm text-gray-600">
                {(recognition.confidence * 100).toFixed(0)}% confidence
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Option 3: Hybrid Integration (Full Featured)

Combine both approaches for maximum functionality:

```typescript
// app/sign-assistant-full/page.tsx
'use client'

import SignLanguageAssistant from '@/components/SignLanguageAssistant'
import SignRecognitionDisplay from '@/components/SignRecognitionDisplay'
import { useState } from 'react'

export default function FullSignAssistantPage() {
  const [textInput, setTextInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Send text to Unity for sign animation
    // (requires Unity-Next.js communication bridge)
    
    setTextInput('')
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Unity Avatar Display */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sign Language Avatar</h2>
          <SignLanguageAssistant width="100%" height="500px" />
          
          {/* Text Input */}
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text to convert to signs..."
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Convert to Signs
            </button>
          </form>
        </div>

        {/* Recognition Results */}
        <div>
          <SignRecognitionDisplay />
        </div>
      </div>
    </div>
  )
}
```

## Database Integration

### Store Sign Recognition Data

Update your Neon PostgreSQL schema:

```sql
-- Add to database/complete-schema.sql

CREATE TABLE IF NOT EXISTS sign_recognitions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  sign_gloss VARCHAR(100) NOT NULL,
  confidence DECIMAL(3, 2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  session_id VARCHAR(255)
);

CREATE INDEX idx_sign_recognitions_user ON sign_recognitions(user_id);
CREATE INDEX idx_sign_recognitions_timestamp ON sign_recognitions(timestamp);

CREATE TABLE IF NOT EXISTS sign_analytics (
  id SERIAL PRIMARY KEY,
  sign_gloss VARCHAR(100) NOT NULL,
  recognition_count INTEGER DEFAULT 0,
  average_confidence DECIMAL(3, 2),
  error_count INTEGER DEFAULT 0,
  last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Update API Route with Database

```typescript
// app/api/sign-recognition/route.ts
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sign, confidence, userId } = await request.json()

    // Store in database
    await query(
      `INSERT INTO sign_recognitions (user_id, sign_gloss, confidence)
       VALUES ($1, $2, $3)`,
      [userId, sign, confidence]
    )

    // Update analytics
    await query(
      `INSERT INTO sign_analytics (sign_gloss, recognition_count, average_confidence)
       VALUES ($1, 1, $2)
       ON CONFLICT (sign_gloss) DO UPDATE SET
         recognition_count = sign_analytics.recognition_count + 1,
         average_confidence = (sign_analytics.average_confidence * sign_analytics.recognition_count + $2) / (sign_analytics.recognition_count + 1),
         last_used = CURRENT_TIMESTAMP`,
      [sign, confidence]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to store recognition' },
      { status: 500 }
    )
  }
}
```

## Deployment Considerations

### Vercel Deployment

1. **WebGL Build:**
   - Place in `public/unity-builds/`
   - Will be served as static files
   - No additional configuration needed

2. **API Routes:**
   - Automatically deployed with Next.js
   - Use environment variables for configuration

3. **Python Service:**
   - Deploy separately (e.g., Railway, Render, AWS Lambda)
   - Use environment variables for Next.js API URL

### Docker Deployment

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - PYTHON_SERVICE_URL=http://python-ml:8000
    depends_on:
      - python-ml

  python-ml:
    build: ./SignLanguageAssistant/Python
    ports:
      - "8000:8000"
    environment:
      - NEXTJS_URL=http://nextjs:3000
```

## Environment Variables

Add to `.env.local`:

```bash
# Sign Language Assistant Configuration
UNITY_BUILD_PATH=/unity-builds/sign-language-assistant
PYTHON_ML_SERVICE_URL=http://localhost:8000
SIGN_RECOGNITION_API_KEY=your-api-key-here

# Enable/disable features
ENABLE_SIGN_RECOGNITION=true
ENABLE_UNITY_AVATAR=true
SIGN_CONFIDENCE_THRESHOLD=0.8
```

## Security Considerations

1. **Camera Access:**
   - Request permissions explicitly
   - Show clear privacy notice
   - Allow users to opt out

2. **Data Privacy:**
   - Don't store video recordings without consent
   - Anonymize analytics data
   - Comply with GDPR/CCPA

3. **API Security:**
   - Add authentication to API routes
   - Rate limiting for sign recognition endpoints
   - Input validation and sanitization

## Performance Optimization

1. **WebGL Loading:**
   - Show loading spinner during Unity initialization
   - Lazy load WebGL build when needed
   - Consider code splitting

2. **API Caching:**
   - Cache sign library data
   - Use Redis for real-time data
   - Implement request debouncing

3. **Database:**
   - Index frequently queried columns
   - Implement pagination for sign history
   - Archive old recognition data

## Testing

### Component Testing

```typescript
// __tests__/SignLanguageAssistant.test.tsx
import { render, screen } from '@testing-library/react'
import SignLanguageAssistant from '@/components/SignLanguageAssistant'

describe('SignLanguageAssistant', () => {
  it('renders iframe with correct src', () => {
    render(<SignLanguageAssistant />)
    const iframe = screen.getByTitle('Sign Language Assistant')
    expect(iframe).toHaveAttribute('src', '/unity-builds/sign-language-assistant/index.html')
  })
})
```

### API Testing

```typescript
// __tests__/api/sign-recognition.test.ts
import { POST } from '@/app/api/sign-recognition/route'
import { NextRequest } from 'next/server'

describe('/api/sign-recognition', () => {
  it('accepts valid sign recognition', async () => {
    const request = new NextRequest('http://localhost:3000/api/sign-recognition', {
      method: 'POST',
      body: JSON.stringify({ sign: 'HELLO', confidence: 0.92 })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

## Troubleshooting

### Issue: Unity WebGL not loading
- Check browser console for errors
- Verify all WebGL files are in correct directory
- Check Content-Security-Policy headers

### Issue: Camera not accessible
- Ensure HTTPS (camera requires secure context)
- Check browser permissions
- Verify allow="camera" attribute on iframe

### Issue: Python service not connecting
- Check service URL in environment variables
- Verify CORS settings
- Check network connectivity

## Next Steps

1. ✅ Complete integration setup
2. 🔄 Test end-to-end flow
3. ⏳ Deploy to staging environment
4. ⏳ User acceptance testing
5. ⏳ Production deployment

## Support

For integration help:
- Email: invest@signlanguageai.com
- GitHub Issues: [Report integration issues]
- Documentation: [ai.mbtq.dev/docs](https://ai.mbtq.dev)

---

**Last Updated:** 2025-10-17
**Version:** 1.0.0
