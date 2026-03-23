/**
 * Deployment script for MBTQ AI Platform
 * Handles environment setup and deployment to containerized solutions (Docker/Kubernetes)
 */

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

const PLATFORMS = {
  AWS: "aws",
  DOCKER: "docker",
  KUBERNETES: "kubernetes",
}

function checkEnvironment() {
  console.log("🔍 Checking environment...")

  const requiredEnvVars = [
    "NEXT_PUBLIC_HUGGINGFACE_SPACE_URL", 
    "AWS_ACCESS_KEY_ID", 
    "AWS_SECRET_ACCESS_KEY"
  ]

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:", missing.join(", "))
    process.exit(1)
  }

  console.log("✅ Environment check passed")
}

function buildProject() {
  console.log("🏗️  Building project...")
  try {
    execSync("npm run build", { stdio: "inherit" })
    console.log("✅ Build completed successfully")
  } catch (error) {
    console.error("❌ Build failed:", error.message)
    process.exit(1)
  }
}

function deployToAWS() {
  console.log("🚀 Deploying to AWS...")
  try {
    execSync("amplify publish", { stdio: "inherit" })
    console.log("✅ Deployed to AWS successfully")
  } catch (error) {
    console.error("❌ AWS deployment failed:", error.message)
    process.exit(1)
  }
}

function deployWithDocker() {
  console.log("🐳 Building and deploying with Docker...")
  try {
    execSync("docker build -t mbtq-ai-platform .", { stdio: "inherit" })
    execSync("docker-compose up -d", { stdio: "inherit" })
    console.log("✅ Docker deployment completed")
  } catch (error) {
    console.error("❌ Docker deployment failed:", error.message)
    process.exit(1)
  }
}

function deployWithKubernetes() {
  console.log("☸️  Deploying to Kubernetes...")
  try {
    // Build Docker image
    execSync("docker build -t mbtq-ai-platform:latest .", { stdio: "inherit" })
    // Apply Kubernetes manifests
    execSync("kubectl apply -f k8s/", { stdio: "inherit" })
    console.log("✅ Kubernetes deployment completed")
  } catch (error) {
    console.error("❌ Kubernetes deployment failed:", error.message)
    process.exit(1)
  }
}

function main() {
  const platform = process.argv[2] || PLATFORMS.DOCKER

  console.log(`🚀 Starting deployment to ${platform}...`)

  checkEnvironment()
  buildProject()

  switch (platform) {
    case PLATFORMS.AWS:
      deployToAWS()
      break
    case PLATFORMS.DOCKER:
      deployWithDocker()
      break
    case PLATFORMS.KUBERNETES:
      deployWithKubernetes()
      break
    default:
      console.error("❌ Unknown platform:", platform)
      console.log("Available platforms:", Object.values(PLATFORMS).join(", "))
      process.exit(1)
  }

  console.log("🎉 Deployment completed successfully!")
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { checkEnvironment, buildProject, deployToAWS, deployWithDocker, deployWithKubernetes }
