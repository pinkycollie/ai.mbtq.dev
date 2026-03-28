# MBTQ Generative AI Platform - Agnostic API Reference

This document outlines the API for the backend-only MBTQ Generative AI Platform. The platform is designed to be a full generative developer platform, providing tools for creating accessible UIs and components.

## Base URL
`http://localhost:3001/api`

## Authentication
All protected routes require a Bearer token in the Authorization header:
`Authorization: Bearer <your_jwt_token>`

### 1. Auth Service
- **POST /auth/signup**: Register a new user.
  - Body: `{ email, password, name? }`
- **POST /auth/login**: Authenticate and receive a JWT.
  - Body: `{ email, password }`

### 2. Generative Engine
- **POST /generate/code**: Generate accessible React/Vite/Deaf-accessible code.
  - Body: `{ prompt, type: 'react' | 'vite' | 'component' | 'template', accessibility: boolean }`
  - Returns: `{ success, type, code, accessibilityStatus, ... }`
- **GET /generate/library**: List available source components and templates for the AI to use.

### 3. AI Chat Service
- **POST /chat**: Generative AI chat with sign language focus.
  - Body: `{ prompt, language?, context?, taskType? }`
  - Returns: `{ content, id, tokenUsage, ... }`

### 4. Video Pipeline
- **POST /video/process**: Analyze video for sign language recognition.
  - Body: `{ url, options? }`
  - Returns: `{ id, status, metadata, detections, ... }`

### 5. PinkSync Estimator
- **POST /pinksync/estimate**: Calculate resource needs for sync and generative tasks.
  - Body: `{ duration, language, quality }`
  - Returns: `{ processingTime, cpuUsage, memory, tokenCost }`

### 6. RSS Feed Aggregator
- **GET /rss**: Fetch Deaf-related news and research.
  - Query: `category, accessible, limit`

## Generative Capabilities
The platform uses the `components/` and `templates/` directories as a source library for generating new code. By maintaining these libraries, the platform ensures that all generated output follows high-standard accessibility guidelines for the Deaf and hard-of-hearing community.

## Integration
- **Unity/Blender**: Use the generative engine to fetch gloss sequences and animation parameters.
- **Frontend Clients**: The API is agnostic and can be used by React, Vue, Mobile, or Desktop applications.
