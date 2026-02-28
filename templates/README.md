# SaaS Templates for Deaf Organizations

This directory contains starter templates for building Deaf-inclusive SaaS applications, video platforms, and organizational websites.

## Available Templates

### 1. Deaf Organization Starter
Complete template for Deaf community organizations, nonprofits, and advocacy groups.

Features:
- WCAG 2.1 AA/AAA compliant design
- Built-in sign language video library integration
- Captioning for all video content
- Visual-first navigation
- Newsletter with accessible email templates
- Event management with video conferencing integration
- Donation/membership system

### 2. Video Platform with ASL/BSL Overlay
Template for creating video platforms with sign language interpretation.

Features:
- AccessibleVideoPlayer component
- Sign language overlay (ASL, BSL, Auslan, NZSL, LSF, DGS, JSL)
- Caption management system
- User preference storage
- Video upload with automatic caption generation
- AWS GenASL integration ready

### 3. Educational Platform
Template for Deaf education and sign language learning platforms.

Features:
- Course management system
- Progress tracking
- Interactive sign language lessons
- Fingerspelling practice modules
- Student-teacher video communication
- Assessment tools with visual feedback

## Getting Started

### Using the CLI Generator

```bash
# Install the MBTQ CLI (coming soon)
npm install -g @mbtq/cli

# Generate a new Deaf-inclusive project
mbtq create my-deaf-org --template organization

# Or for a video platform
mbtq create my-video-platform --template video-platform
```

### Manual Setup

1. Clone this repository
2. Copy the desired template folder
3. Install dependencies: `npm install`
4. Configure environment variables
5. Run development server: `npm run dev`

## Template Structure

```
templates/
├── deaf-organization/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── about/            # About page
│   │   ├── events/           # Events management
│   │   ├── resources/        # Resource library
│   │   └── contact/          # Contact form
│   ├── components/
│   │   ├── navigation.tsx    # Accessible navigation
│   │   ├── video-player.tsx  # Accessible video player
│   │   └── sign-overlay.tsx  # Sign language overlay
│   └── lib/
│       ├── accessibility.ts  # Accessibility utilities
│       └── deaf-auth.ts      # DeafAUTH integration
│
├── video-platform/
│   ├── app/
│   │   ├── page.tsx          # Video library
│   │   ├── video/[id]/       # Video player page
│   │   ├── upload/           # Video upload
│   │   └── settings/         # User preferences
│   ├── components/
│   │   ├── video-grid.tsx    # Accessible video grid
│   │   ├── caption-editor.tsx# Caption editing
│   │   └── overlay-config.tsx# Overlay configuration
│   └── lib/
│       ├── genasl.ts         # AWS GenASL integration
│       └── captions.ts       # Caption management
│
└── educational-platform/
    ├── app/
    │   ├── page.tsx          # Course catalog
    │   ├── course/[id]/      # Course viewer
    │   ├── practice/         # Practice modules
    │   └── progress/         # Progress tracking
    ├── components/
    │   ├── lesson-player.tsx # Lesson video player
    │   ├── quiz.tsx          # Visual quiz component
    │   └── fingerspelling.tsx# Fingerspelling practice
    └── lib/
        ├── progress.ts       # Progress tracking
        └── assessment.ts     # Assessment utilities
```

## Accessibility Standards

All templates follow:
- WCAG 2.1 AA (minimum) / AAA (recommended)
- ADA compliance requirements
- Section 508 guidelines
- EN 301 549 (European accessibility standard)

### Deaf-Specific Features

1. **Visual-First Design**
   - No audio-only content
   - Visual alternatives for all audio cues
   - Flash/vibration notifications

2. **Sign Language Support**
   - Built-in sign language video library
   - AWS GenASL avatar integration
   - Multiple sign language support

3. **Captioning**
   - Customizable caption styles
   - Live caption support
   - Caption download options

4. **Authentication**
   - DeafAUTH integration
   - Visual CAPTCHA
   - Video-based verification

## Deployment

### Fibonrose DAO Nodes

Templates are optimized for deployment on Fibonrose DAO infrastructure:

```bash
# Deploy to Fibonrose
mbtq deploy --target fibonrose

# Or use Docker
docker build -t my-deaf-app .
docker push fibonrose-registry/my-deaf-app
```

### Vercel/Next.js

```bash
# Deploy to Vercel
vercel deploy
```

### AWS Amplify

```bash
# Deploy to AWS
amplify publish
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](../docs/CONTRIBUTING.md).

## License

MIT License - See [LICENSE](../LICENSE)
