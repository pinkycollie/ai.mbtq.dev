# Deployment Guide

## Docker Deployment (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Environment variables configured

### Quick Start

```bash
# Build and start all services
npm run docker:build
npm run docker:run

# Or use docker-compose directly
docker-compose up -d
```

### Docker Compose Configuration
```yaml
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
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, k3s, EKS, GKE, AKS)
- kubectl configured
- Docker registry access

### Steps

1. **Build and Push Docker Image**
```bash
docker build -t mbtq-ai-platform:latest .
docker tag mbtq-ai-platform:latest your-registry/mbtq-ai-platform:latest
docker push your-registry/mbtq-ai-platform:latest
```

2. **Apply Kubernetes Manifests**
```bash
kubectl apply -f k8s/
```

3. **Verify Deployment**
```bash
kubectl get pods -l app=mbtq-ai-platform
kubectl get services
```

## AWS Deployment

### Using AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Using AWS ECS/Fargate

1. **Create ECR Repository**
2. **Push Docker Image to ECR**
3. **Create ECS Task Definition**
4. **Deploy to ECS Cluster**

### Using AWS EC2

1. **Launch EC2 Instance**
2. **Install Docker and dependencies**
3. **Clone repository and build**
4. **Configure reverse proxy (nginx)**
5. **Set up SSL certificate**

## Environment Configuration

### Production Environment Variables
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
NEXT_PUBLIC_HUGGINGFACE_SPACE_URL=your_huggingface_url
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
```

## Monitoring and Logging

### Recommended Tools
- **Prometheus + Grafana** for metrics monitoring
- **Sentry** for error tracking
- **ELK Stack** for log aggregation
- **AWS CloudWatch** for infrastructure monitoring (AWS deployments)

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Regular security updates
- [ ] Container security scanning enabled
