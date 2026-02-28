# AI Framework for Deaf Inclusion

A comprehensive framework for building Deaf-inclusive web applications with AI-powered sign language recognition, WCAG-compliant components, and accessibility-first design.

[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Deaf Inclusive](https://img.shields.io/badge/Deaf-Inclusive-blue.svg)](#deaf-inclusion-features)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Key Features

### Accessible Components
- **AccessibleVideoPlayer**: WCAG 2.1 AA compliant video player with built-in captioning and sign language overlay
- **SignLanguageOverlay**: Real-time sign language video overlay supporting ASL, BSL, Auslan, NZSL, LSF, DGS, JSL
- **AccessibleCaptionDisplay**: Customizable caption display with high contrast options

### Machine Learning Models
- **Vision Models**: Pre-trained models for sign language recognition with MediaPipe and TensorFlow.js
- **Language Models**: ASL/BSL syntax translation with grammar rule support
- **Accessibility Standards Generator**: Automated WCAG compliance checking

### Authentication
- **DeafAUTH**: Visual-first authentication system with video verification and visual CAPTCHA

### Infrastructure
- **MBTQ WCAG Action**: GitHub Action for CI/CD accessibility validation
- **Fibonrose DAO Nodes**: Decentralized deployment infrastructure
- **RSS Feed Aggregator**: Deaf-related content aggregation

### Templates
- Deaf Organization SaaS starter
- Video Platform with ASL/BSL overlay
- Educational Platform template

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/pinkycollie/ai.mbtq.dev.git
cd ai.mbtq.dev

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📦 Component Usage

### AccessibleVideoPlayer

```tsx
import { AccessibleVideoPlayer } from "@/components/accessibility"

<AccessibleVideoPlayer
  src="/videos/presentation.mp4"
  title="Welcome Message"
  captions={[
    { src: "/captions/en.vtt", label: "English", language: "en", default: true }
  ]}
  signLanguageOverlay={{
    videoSrc: "/signs/asl/welcome.mp4",
    language: "asl",
    position: "bottom-right"
  }}
/>
```

### SignLanguageOverlay

```tsx
import { SignLanguageOverlay } from "@/components/accessibility"

<SignLanguageOverlay
  text="Hello, welcome to our platform"
  language="asl"
  genAslEndpoint={process.env.AWS_GENASL_ENDPOINT}
  size="medium"
  position="bottom-right"
/>
```

### DeafAUTH Integration

```tsx
import { DeafAUTHService } from "@/lib/deaf-auth"

const deafAuth = new DeafAUTHService({
  visualTwoFactor: true,
  signLanguage: "asl",
  visualCaptcha: true
})

// Create user with Deaf-friendly defaults
const user = await deafAuth.createUser(email, password, {
  isDeaf: true,
  preferredSignLanguage: "asl"
})
```

## 🔧 Machine Learning

### Sign Language Recognition

```typescript
import { createSignRecognitionModel } from "@/lib/ml"

const model = createSignRecognitionModel("asl", "balanced")
await model.load()

const result = await model.recognize(videoFrame)
console.log(result.sign, result.confidence)
```

### Text to Sign Translation

```typescript
import { SignLanguageTranslator } from "@/lib/ml"

const translator = new SignLanguageTranslator("asl")
const result = translator.translate("Hello, how are you?")
console.log(result.signSequence) // [{sign: "HELLO"}, {sign: "HOW"}, ...]
```

## 🔍 WCAG Compliance

This project includes a GitHub Action for automated WCAG compliance checking:

```yaml
# .github/workflows/mbtq-wcag-check.yml
# Runs on push/PR to validate accessibility
```

The action checks:
- Caption presence in video content
- Sign language overlay implementation
- Keyboard accessibility
- Color contrast ratios
- ARIA labels and roles

## 📂 Project Structure

```
├── app/                    # Next.js application
│   ├── api/               # API routes
│   │   ├── rss/           # RSS feed aggregator
│   │   └── ...
│   └── ...
├── components/
│   ├── accessibility/     # Deaf-inclusive components
│   │   ├── AccessibleVideoPlayer.tsx
│   │   ├── SignLanguageOverlay.tsx
│   │   └── AccessibleCaptionDisplay.tsx
│   └── ui/               # Base UI components
├── lib/
│   ├── ml/               # Machine learning utilities
│   │   ├── vision-models.ts
│   │   └── language-models.ts
│   └── deaf-auth/        # DeafAUTH integration
├── templates/            # SaaS starter templates
└── .github/workflows/    # CI/CD workflows
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Fibonrose DAO Nodes
```bash
docker build -t fibonrose-registry/app:latest .
fibonrose deploy --config fibonrose.config.yml
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 📖 Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [SignLanguageAssistant](SignLanguageAssistant/README.md)

## 🤝 Contributing

We welcome contributions! Please see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

## Legacy Documentation

### Repository Goals
This repository aims to improve understanding of system integration, AI workflow, and microservices, specifically focusing on `DeafAUTH`, `PinkSync`, and `Fibonrose`.

### Architectural Compatibility
To facilitate this understanding, [mbtq_architecture.html](mbtq_architecture.html) has been linked as a key component.

### Backend Transition: Flask to FastAPI
We are transitioning our backend from Flask to FastAPI for better performance and scalability. This transition aims to leverage FastAPI's asynchronous capabilities and automatic generation of API documentation.

### Blockchain Node Logging Strategy
Detailed logging strategies for blockchain nodes will be embedded to enhance traceability and performance monitoring. Strategies include transaction logging, error reporting, and performance benchmarks.
