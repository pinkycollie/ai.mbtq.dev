# MBTQ Generative AI Platform - Agnostic API Reference

This document outlines the API for the backend-only MBTQ Generative AI Platform. MBTQ is a full generative platform designed for the Deaf and hard-of-hearing community, accessible via high-standard RESTful services.

## Base URL
`http://localhost:3001/api`

## Core Services

### 1. DeafAUTH (Visual-First Authentication)
Provides visual authentication using video verification and sign language challenges.
- **POST /auth/visual/challenge**: Create a sign language challenge.
  - Body: `{ userId }`
- **POST /auth/visual/verify**: Verify a video response to a challenge.
  - Body: `{ userId, challenge, videoUrl }`

### 2. Generative Engine & PinkFlow (A11y Node)
Generate and validate accessible code and UI components.
- **POST /generate/code**: Generate accessible React/Vite/Unity-ready code.
  - Body: `{ prompt, type, accessibility: boolean }`
- **POST /a11y/validate**: Validate code or URL for WCAG compliance.
  - Body: `{ content, type: 'url' | 'code' }`
- **POST /a11y/fix**: Generate an accessibility fix for a given issue.

### 3. PinkSync (Resource Estimation)
Estimate and synchronize AI synchronization tasks.
- **POST /pinksync/estimate**: Resource and token estimation for video/sign sync.
  - Body: `{ duration, language, quality }`

### 4. Fibonrose (Node Management)
Decentralized deployment and node health monitoring.
- **GET /fibonrose/health/:nodeId**: Check health of a specific node.
- **POST /fibonrose/deploy**: Deploy platform configuration to a node.

### 5. AI Services (Primary Entry Point)
Unified entry point for video analysis and generative chat.
- **POST /chat**: LLM-based generative chat for sign language assistance.
- **POST /video/process**: Primary gateway for video analysis and recognition.
  - Body: `{ url, options? }`

### 6. Standard Auth & RSS
- **POST /auth/signup**: Standard email/password registration.
- **POST /auth/login**: Standard authentication.
- **GET /rss**: Fetch filtered Deaf-related community feeds.

## Agnostic Architecture
The backend is designed to serve any client frontend while maintaining the source libraries in `components/` and `templates/`. Authentication is secured with `bcryptjs` and `JWT`.

## GitHub Repositories
- Main Platform: [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
- MBTQ Dev Org: [github.com/mbtq-dev](https://github.com/mbtq-dev)
