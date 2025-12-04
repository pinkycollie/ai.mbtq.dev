# MBTQ AI Platform

A cutting-edge **Generative AI Development Platform** with Sign Language capabilities, Deaf-centric accessibility, and containerized deployment.

## 🧠 The MBTQ Framework

- **M**ind - AI/ML Models, NLP, Computer Vision, Sign Recognition
- **B**usiness - SaaS Solutions, API Services, Enterprise Integration
- **T**ech - Microservices, Docker, Kubernetes, CI/CD Pipelines
- **Q**uantum - Future-ready Architecture, Scalable Solutions

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or use the CLI
npm run cli dev
```

### Docker Deployment

```bash
# Build and run with Docker
npm run docker:build
npm run docker:run

# Or use docker-compose directly
docker-compose up -d
```

## 📁 Repository Structure

```
mbtq-ai-platform/
├── app/                    # Next.js app routes
│   ├── api/               # API endpoints
│   ├── chat/              # Chat interface
│   └── dashboard/         # User dashboard
├── cli/                    # CLI launcher and tools
├── components/             # React components
├── frontend-inject/        # HTML injection components
│   └── mbtq_architecture.html
├── services/              # AI and accessibility services
│   ├── ai/               # Video pipeline, LLM integration
│   ├── accessibility/    # ASL/BSL translation
│   └── rss/              # Deaf community RSS feeds
├── SignLanguageAssistant/ # Unity/Blender/Python integration
├── docs/                  # Documentation
├── Dockerfile            # Container configuration
└── docker-compose.yml    # Multi-container orchestration
```

## ♿ Deaf-Centric Accessibility

This platform is built with and for the Deaf community, featuring:

- **ASL Translation** - American Sign Language translation and interpretation
- **BSL Support** - British Sign Language recognition and generation
- **RSS Feeds** - Curated news and research for Deaf community awareness
- **Video Apps** - Accessible video processing with sign language overlays

## 🔧 CLI Tools

```bash
# Show help
npm run cli help

# Scaffold new components
npm run cli scaffold component SignLanguageVideo
npm run cli scaffold api translation
npm run cli scaffold service VideoProcessor

# Run workflows
npm run cli workflow ai-pipeline
npm run cli workflow rss-update
npm run cli workflow health-check
```

## 🐳 Container Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions including:

- Docker containerization
- Kubernetes orchestration
- AWS deployment options

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Architecture Overview](frontend-inject/mbtq_architecture.html)

## 🛠️ Technology Stack

- **Frontend**: React 19, Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Node.js, AI SDK, Groq LLM, Zod
- **Database**: PostgreSQL (Neon), Redis
- **DevOps**: Docker, Kubernetes, GitHub Actions
- **AI/ML**: Sign Language Recognition, Video Processing, LLM Integration

## 📄 License

MIT License - See LICENSE file for details

---

🌐 **Live at**: [ai.mbtq.dev](https://ai.mbtq.dev)
📧 **Contact**: invest@signlanguageai.com