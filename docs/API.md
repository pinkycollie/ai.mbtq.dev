# API Documentation

## Overview

The Sign Language AI Chatbot Platform provides RESTful APIs for integrating sign language interpretation capabilities into your applications.

## Base URL

\`\`\`
https://api.signlanguageai.com/v1
\`\`\`

## Authentication

All API requests require authentication using API keys:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.signlanguageai.com/v1/interpret
\`\`\`

## Endpoints

### Sign Language Interpretation

#### POST /interpret

Interpret sign language from video, image, or text input.

**Request:**
\`\`\`json
{
  "input": "base64_video_data_or_text",
  "type": "video|image|text",
  "language": "asl|bsl",
  "options": {
    "realtime": true,
    "confidence_threshold": 0.8
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "interpretation": "Hello, how are you?",
  "confidence": 0.95,
  "timestamp": "2024-01-15T10:30:00Z",
  "language": "asl",
  "tokens_earned": 5
}
\`\`\`

### Token Rewards

#### POST /rewards/claim

Claim tokens for contributing to the platform.

**Request:**
\`\`\`json
{
  "user_id": "user123",
  "contribution_type": "video_upload|validation|training",
  "data": "contribution_data",
  "metadata": {
    "duration": 30,
    "quality_score": 0.9
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "tokens_awarded": 10,
  "total_balance": 150,
  "transaction_id": "tx_abc123"
}
\`\`\`

## Rate Limits

- Free tier: 100 requests/hour
- Pro tier: 1,000 requests/hour
- Enterprise: Custom limits

## Error Codes

- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`429\` - Rate Limit Exceeded
- \`500\` - Internal Server Error
