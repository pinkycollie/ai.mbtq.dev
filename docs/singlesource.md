# 🎯 MBTQ TECH STACK - SINGLE SOURCE OF TRUTH

**Last Updated:** November 17, 2025  
**Version:** 2.0.0  
**Authority:** This document overrides ALL other tech stack references

-----

## 🏗️ MICROSERVICES ARCHITECTURE (From Scaffolding PDF)

### **Service 1: Identity Management (IdM) - “DeafAUTH”**

```yaml
Purpose: Central authentication & user identity
Core Tech:
  - Framework: Next.js 14 (App Router)
  - Auth Library: Better Auth (NOT Auth0, NOT Firebase Auth)
  - Database: PostgreSQL + Prisma ORM
  - MFA: Passkeys/TOTP (NO voice-based auth)
  - Token: JWT with accessibility attributes

Deployment:
  - Container: Docker
  - Orchestration: Kubernetes
  - Port: 3001
  
User Schema Extensions:
  - primary_sign_language: ASL | BSL | None
  - caption_preference: On | Off
  - auth_timeout_multiplier: 1.0 | 2.0
  - visual_theme_id: high_contrast | dark | light
  - is_interpreter: boolean
  - mfa_method: Passkey | TOTP
```

### **Service 2: Provisioning Service - “PinkSync”**

```yaml
Purpose: Real-time synchronization & automation
Core Tech:
  - Framework: Node.js + Fastify
  - Message Queue: RabbitMQ (preferred) OR Kafka
  - Protocol: SCIM (System for Cross-domain Identity Management)
  - Event System: WebSockets + Server-Sent Events (SSE)

Deployment:
  - Container: Docker
  - Orchestration: Kubernetes
  - Port: 3002

Responsibilities:
  - Listen to IdM events (User Profile Updated, User Logged In)
  - Translate accessibility profiles to SCIM format
  - Push updates to Accessibility Node Runtime
  - Trigger CI/CD pipelines on repo changes
```

### **Service 3: Accessibility Node Runtime - “The PinkSync Nodes”**

```yaml
Purpose: Client-side execution with accessibility enforcement
Core Tech:
  - Framework: React 19 + Next.js 14
  - UI Library: Chakra UI + Tailwind v4
  - Accessibility: React Aria
  - State: Zustand
  - Data Fetching: tRPC (type-safe APIs)

Deployment:
  - Static: Cloudflare Pages, GitHub Pages, Netlify
  - SSR: Docker + Kubernetes (if needed)
  - Port: 3003

Responsibilities:
  - JWT token validation
  - Load user accessibility preferences
  - Configure "pinksync nodes" with visual-first properties
  - Disable voice prompts, enable captions
  - Render ASL hints and larger frames
```

### **Service 4: Reputation & Logging - “Fibonrose”**

```yaml
Purpose: Trust validation, logging, reputation scoring
Core Tech:
  - Database: Astra DB (Cassandra) - THIS IS YOUR cassandra/ files!
  - Vector Store: ChromaDB (for AI embeddings)
  - API: tRPC + REST
  - Framework: Next.js 14

Deployment:
  - Container: Docker
  - Port: 3004

Responsibilities:
  - Log all user actions, API calls, auth events
  - Calculate reputation scores
  - Store accessibility usage patterns
  - Provide analytics for DAO governance
```

-----

## 🛠️ UNIFIED TECH STACK

### **Frontend (React/Next.js)**

```json
{
  "framework": "Next.js 14.x (App Router - NOT Pages Router)",
  "language": "TypeScript 5.x",
  "ui_library": "Chakra UI v2 + Tailwind CSS v4",
  "styling": "Tailwind v4 (utility classes only)",
  "state_management": "Zustand",
  "forms": "React Hook Form + Zod validation",
  "animation": "Framer Motion",
  "accessibility": "React Aria",
  "charts": "Recharts",
  "icons": "Lucide React (NOT Phosphor, NOT FontAwesome)"
}
```

### **Backend (Node.js/TypeScript)**

```json
{
  "runtime": "Node.js 18+ LTS",
  "framework": "Fastify (NOT Express)",
  "api_layer": "tRPC v11 (type-safe, NO REST unless external)",
  "validation": "Zod",
  "auth": "Better Auth (NOT Auth0, NOT Clerk, NOT NextAuth)",
  "database_orm": "Prisma (for PostgreSQL)",
  "cassandra_driver": "cassandra-driver (your existing files)",
  "testing": "Playwright (e2e), Vitest (unit)"
}
```

### **Databases**

```json
{
  "primary": "PostgreSQL 15+ (via Supabase OR self-hosted)",
  "cassandra": "Astra DB (DataStax - your cassandra/ files)",
  "vector": "ChromaDB (AI embeddings)",
  "cache": "Redis (optional)",
  "blob_storage": "Supabase Storage OR Cloudflare R2"
}
```

### **AI & Machine Learning**

```json
{
  "llm": "OpenAI GPT-4 (via official SDK)",
  "orchestration": "LangChain",
  "vector_db": "ChromaDB",
  "embeddings": "OpenAI text-embedding-3-small",
  "voice_disabled": true,
  "caption_generation": "Whisper API (OpenAI)"
}
```

### **DevOps & Deployment**

```json
{
  "version_control": "GitHub (NOT GitLab, NOT Bitbucket)",
  "ci_cd": "GitHub Actions",
  "containers": "Docker + Docker Compose",
  "orchestration": "Kubernetes (production)",
  "hosting_options": [
    "GitHub Pages (static)",
    "Cloudflare Pages (static + functions)",
    "Netlify (free tier)",
    "Render (free tier)",
    "Railway ($5/mo free credit)",
    "Vercel (ONLY if free tier, avoid paid)"
  ],
  "monitoring": "Grafana + Prometheus (self-hosted)"
}
```

### **Development Tools**

```json
{
  "ide": "Cursor OR VS Code",
  "package_manager": "npm (NOT yarn, NOT pnpm, NOT bun)",
  "monorepo": "npm workspaces (NOT Turborepo, NOT Nx)",
  "linting": "ESLint + Prettier",
  "git_workflow": "Feature branches → PR → main (auto-deploy)"
}
```

-----

## 📦 NPM DEPENDENCIES (Canonical List)

### **package.json (Root - Monorepo)**

```json
{
  "name": "mbtq-universe",
  "private": true,
  "workspaces": [
    "services/deafauth",
    "services/pinksync",
    "services/fibonrose",
    "services/accessibility-nodes",
    "shared"
  ],
  "scripts": {
    "dev": "npm run dev --workspaces",
    "build": "npm run build --workspaces",
    "deploy": "npm run deploy --workspaces"
  }
}
```

### **DeafAUTH (Service 1) Dependencies**

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^19.0.0",
    "better-auth": "^1.0.0",
    "prisma": "^5.20.0",
    "@prisma/client": "^5.20.0",
    "zod": "^3.23.0",
    "jose": "^5.9.0"
  }
}
```

### **PinkSync (Service 2) Dependencies**

```json
{
  "dependencies": {
    "fastify": "^5.1.0",
    "@fastify/cors": "^10.0.0",
    "amqplib": "^0.10.4",
    "ws": "^8.18.0",
    "zod": "^3.23.0"
  }
}
```

### **Fibonrose (Service 3) Dependencies**

```json
{
  "dependencies": {
    "cassandra-driver": "^4.7.2",
    "@datastax/astra-db-ts": "^1.5.0",
    "chromadb": "^1.8.1",
    "next": "^14.2.0",
    "@trpc/server": "^11.0.0",
    "@trpc/client": "^11.0.0"
  }
}
```

### **Accessibility Nodes (Service 4) Dependencies**

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^19.0.0",
    "@chakra-ui/react": "^2.10.0",
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.11.0",
    "recharts": "^2.12.0",
    "lucide-react": "^0.460.0",
    "zustand": "^5.0.0",
    "@trpc/client": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "react-aria": "^3.35.0"
  }
}
```

### **Shared (Common Utilities)**

```json
{
  "dependencies": {
    "zod": "^3.23.0",
    "date-fns": "^4.1.0",
    "lodash": "^4.17.21"
  }
}
```

-----

## 🚫 WHAT TO AVOID (Banned Tech)

### **DO NOT USE:**

- ❌ **Vercel paid plans** (use free tier only if needed)
- ❌ **NextAuth** (use Better Auth instead)
- ❌ **Auth0 / Clerk** (use Better Auth)
- ❌ **Firebase Auth** (use Better Auth + Supabase)
- ❌ **Express.js** (use Fastify)
- ❌ **REST APIs internally** (use tRPC for type safety)
- ❌ **MongoDB** (use PostgreSQL + Astra DB)
- ❌ **Voice-based authentication** (Deaf-first principle)
- ❌ **Audio-only features** (must have visual alternatives)
- ❌ **Yarn, pnpm, bun** (use npm for consistency)

-----

## 🎯 AI/LLM INTERACTION TEMPLATE

**When working with AI assistants (Claude, GPT, etc.), always provide this context:**

```markdown
I'm building the MBTQ Universe - a Deaf-first, microservices-based platform.

TECH STACK (mandatory):
- Frontend: Next.js 14 + React 19 + Chakra UI + Tailwind v4
- Backend: Fastify + tRPC + Prisma
- Auth: Better Auth (DeafAUTH service)
- Databases: PostgreSQL + Astra DB (Cassandra)
- AI: LangChain + OpenAI + ChromaDB
- Deployment: Docker + Kubernetes (or GitHub Pages for static)

ARCHITECTURE (from scaffolding.pdf):
1. Identity Management (DeafAUTH) - Port 3001
2. Provisioning Service (PinkSync) - Port 3002
3. Accessibility Node Runtime - Port 3003
4. Reputation System (Fibonrose) - Port 3004

CRITICAL RULES:
- NO voice-based features (Deaf-first)
- ALL auth uses Passkeys/TOTP (no SMS, no voice)
- JWT tokens MUST include accessibility attributes
- Use tRPC for internal APIs (not REST)
- Use Better Auth (not Auth0/Clerk/Firebase)
- Deploy to free platforms (no Vercel paid plans)

Current task: [YOUR SPECIFIC REQUEST]
```

-----

## 📋 PROJECT STRUCTURE (Canonical)

```
mbtq-universe/
├── services/
│   ├── deafauth/              # Service 1: Identity Management
│   │   ├── app/               # Next.js 14 App Router
│   │   ├── lib/               # Better Auth config
│   │   ├── prisma/            # Database schema
│   │   └── package.json
│   │
│   ├── pinksync/              # Service 2: Provisioning
│   │   ├── src/
│   │   │   ├── listeners/     # RabbitMQ consumers
│   │   │   ├── scim/          # SCIM protocol handlers
│   │   │   └── connectors/    # Target system integrations
│   │   └── package.json
│   │
│   ├── fibonrose/             # Service 3: Reputation & Logging
│   │   ├── app/               # Next.js API routes
│   │   ├── lib/
│   │   │   ├── cassandra/     # YOUR EXISTING cassandra/ FILES GO HERE
│   │   │   ├── chromadb/      # Vector store
│   │   │   └── astra-db/      # Astra DB client
│   │   └── package.json
│   │
│   └── accessibility-nodes/   # Service 4: Client Runtime
│       ├── app/               # Next.js 14 App Router
│       ├── components/        # React components
│       ├── lib/
│       │   ├── jwt/           # Token validation
│       │   ├── config/        # Node configuration manager
│       │   └── sdk/           # Client-side SDK
│       └── package.json
│
├── shared/                    # Shared utilities
│   ├── types/                 # TypeScript definitions
│   ├── utils/                 # Common functions
│   └── schemas/               # Zod validation schemas
│
├── infrastructure/
│   ├── docker/                # Dockerfiles for each service
│   ├── kubernetes/            # K8s manifests
│   └── github-actions/        # CI/CD workflows
│
├── docs/                      # Documentation
│   ├── scaffolding.pdf        # Architecture reference
│   └── winget-strategy.md     # Development environment
│
└── package.json               # Root monorepo config
```

-----

## 🔄 CASSANDRA FILES INTEGRATION

**Your existing `cassandra/` files belong in:**

```
services/fibonrose/lib/cassandra/
```

**Usage in Fibonrose:**

```typescript
// services/fibonrose/lib/cassandra/client.ts
import { Client } from 'cassandra-driver';

export const cassandraClient = new Client({
  cloud: {
    secureConnectBundle: process.env.ASTRA_DB_SECURE_BUNDLE_PATH
  },
  credentials: {
    username: process.env.ASTRA_DB_CLIENT_ID,
    password: process.env.ASTRA_DB_CLIENT_SECRET
  },
  keyspace: 'mbtq_fibonrose'
});

export async function logToFibonrose(event: {
  type: string;
  userId?: string;
  action: string;
  metadata?: any;
}) {
  const query = `
    INSERT INTO mbtq_logs (id, type, user_id, action, metadata, timestamp)
    VALUES (uuid(), ?, ?, ?, ?, toTimestamp(now()))
  `;
  
  await cassandraClient.execute(query, [
    event.type,
    event.userId,
    event.action,
    event.metadata
  ], { prepare: true });
}
```

-----

## ✅ VALIDATION CHECKLIST

**Before starting ANY new code, verify:**

- [ ] Using Next.js 14 (not 13, not 12)
- [ ] Using Better Auth (not Auth0/Clerk)
- [ ] Using tRPC internally (not REST)
- [ ] Using Fastify backend (not Express)
- [ ] Using PostgreSQL + Astra DB (not MongoDB)
- [ ] Microservices ports: 3001, 3002, 3003, 3004
- [ ] Deaf-first: NO voice features, captions ON
- [ ] Accessibility attributes in JWT tokens
- [ ] Cassandra files in `services/fibonrose/lib/cassandra/`

-----

## 🚀 QUICK START COMMANDS

```bash
# Clone monorepo
git clone https://github.com/mbtq-universe
cd mbtq-universe

# Install all dependencies
npm install

# Setup databases
npm run db:setup

# Start all services in dev mode
npm run dev
# → DeafAUTH:     http://localhost:3001
# → PinkSync:     http://localhost:3002
# → Fibonrose:    http://localhost:3004
# → A11y Nodes:   http://localhost:3003

# Build for production
npm run build

# Deploy to Kubernetes
npm run deploy:k8s

# Deploy to free hosting
npm run deploy:static  # GitHub Pages/Cloudflare
```

-----

**🎯 This document is the SINGLE SOURCE OF TRUTH. All AI interactions, documentation, and code generation MUST reference this file.**

**Last Updated:** November 17, 2025  
**Maintained by:** MBTQ Core Team  
**Changes:** Submit PR to update this doc
