# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- Vercel account
- GitHub repository
- Environment variables configured

### Steps

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings

2. **Environment Variables**
   Set the following in Vercel dashboard:
   \`\`\`
   NEXT_PUBLIC_HUGGINGFACE_SPACE_URL=your_huggingface_url
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=us-east-1
   BLOCKCHAIN_API_KEY=your_blockchain_key
   \`\`\`

3. **Deploy**
   - Push to main branch
   - Vercel will automatically deploy

## AWS Deployment

### Using AWS Amplify

\`\`\`bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
\`\`\`

### Using AWS EC2

1. **Launch EC2 Instance**
2. **Install Node.js and dependencies**
3. **Clone repository and build**
4. **Configure reverse proxy (nginx)**
5. **Set up SSL certificate**

## Docker Deployment

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
\`\`\`

## Environment Configuration

### Production Environment Variables
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
\`\`\`

## Monitoring and Logging

### Recommended Tools
- **Vercel Analytics** for performance monitoring
- **Sentry** for error tracking
- **LogRocket** for user session recording
- **AWS CloudWatch** for infrastructure monitoring

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Regular security updates
