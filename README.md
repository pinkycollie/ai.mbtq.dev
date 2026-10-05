# MBTQ Generative AI Platform - Backend Services

A high-performance, Deaf-inclusive **Full Generative Developer Platform** focused on sign language recognition, translation, and accessibility. This is the **backend-only** version, providing a frontend-agnostic API layer for various clients (Unity, Mobile, Web) to generate accessible UI components and systems.

## 🌟 Vision

MBTQ is not just a sign language tool; it is a full generative platform designed to create accessible digital experiences for the Deaf and hard-of-hearing community. Inspired by the long-term functionality of tools like v0 and Gemini, MBTQ provides a secure, agnostic architecture for generating React, Vite, and 3D assets.

## 🚀 Key Features

- **Generative Code Engine**: Generate React/Vite components and templates with built-in accessibility.
- **Sign Language AI**: Real-time sign recognition and text-to-sign translation services.
- **PinkSync Estimator**: Resource estimation for sync and generative tasks.
- **Agnostic API**: Secure REST API built with Express, TypeScript, and Zod.
- **Source Library**: Extensive collection of Deaf-inclusive components and templates used as a reference for generation.
- **Deaf-Centric RSS**: Aggregated feed of news and research relevant to the community.
- **Containerized**: Production-ready Docker and Docker Compose setup.

## 📦 API Reference

See [docs/API_AGNOSTIC.md](docs/API_AGNOSTIC.md) for detailed documentation.

## 🏗️ Architecture

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (Neon Serverless)
- **AI**: Integration with LLMs (Groq) and custom ML pipelines
- **Security**: JWT, bcryptjs, Helmet, Rate Limiting
- **Agnostic Layer**: Pure API layer serving any frontend (Unity, React, Vue, etc.)

## 🎮 Visual Sign System Integration

The platform integrates with the **SignLanguageAssistant** (Unity/Blender/Python). See the `SignLanguageAssistant` directory for technical details.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (or Neon.tech account)

### Installation

```bash
# Clone the repository
git clone https://github.com/pinkycollie/ai.mbtq.dev.git
cd ai.mbtq.dev

# Install dependencies
npm install

# Run development server
npm run dev &
```

## 📄 License

MIT License - See [LICENSE](LICENSE)
