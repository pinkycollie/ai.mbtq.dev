#!/usr/bin/env python3
"""
Build script for optimizing the application for production.
"""

import os
import sys
import shutil
import subprocess
import argparse
from pathlib import Path
from typing import List, Dict, Any, Optional

# Configuration
BUILD_DIR = "build"
EXCLUDE_PATTERNS = [
    "__pycache__",
    "*.pyc",
    ".git",
    ".env",
    "venv",
    ".venv",
    "node_modules",
    ".DS_Store",
    "*.log",
    "tools",
    "tests",
    "*.md",
    "*.example",
]

def clean_build_dir():
    """Clean the build directory."""
    build_path = Path(BUILD_DIR)
    if build_path.exists():
        shutil.rmtree(build_path)
    
    build_path.mkdir(parents=True, exist_ok=True)
    print(f"Cleaned build directory: {build_path}")

def copy_files():
    """Copy files to the build directory."""
    build_path = Path(BUILD_DIR)
    
    # Copy app directory
    app_path = Path("app")
    if not app_path.exists():
        print("Error: app directory not found")
        return False
    
    # Copy files
    for item in app_path.glob("**/*"):
        # Skip excluded patterns
        skip = False
        for pattern in EXCLUDE_PATTERNS:
            if pattern.startswith("*"):
                if item.name.endswith(pattern[1:]):
                    skip = True
                    break
            elif pattern in str(item):
                skip = True
                break
        
        if skip:
            continue
        
        # Create relative path
        relative_path = item.relative_to(".")
        target_path = build_path / relative_path
        
        if item.is_dir():
            target_path.mkdir(parents=True, exist_ok=True)
        else:
            target_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, target_path)
    
    # Copy requirements.txt
    if Path("requirements.txt").exists():
        shutil.copy2("requirements.txt", build_path / "requirements.txt")
    
    # Copy .env.example
    if Path(".env.example").exists():
        shutil.copy2(".env.example", build_path / ".env.example")
    
    print("Copied files to build directory")
    return True

def optimize_python_files():
    """Optimize Python files."""
    build_path = Path(BUILD_DIR)
    
    try:
        # Compile Python files
        subprocess.run(
            [sys.executable, "-m", "compileall", str(build_path)],
            check=True
        )
        
        print("Compiled Python files")
        return True
    except subprocess.SubprocessError as e:
        print(f"Error compiling Python files: {e}")
        return False

def create_docker_files():
    """Create Docker files for deployment."""
    build_path = Path(BUILD_DIR)
    
    # Create Dockerfile
    dockerfile_content = """FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8000
ENV HOST=0.0.0.0

CMD ["python", "-m", "app.main"]
"""
    
    with open(build_path / "Dockerfile", "w") as f:
        f.write(dockerfile_content)
    
    # Create .dockerignore
    dockerignore_content = """__pycache__
*.pyc
.git
.env
venv
.venv
node_modules
.DS_Store
*.log
"""
    
    with open(build_path / ".dockerignore", "w") as f:
        f.write(dockerignore_content)
    
    print("Created Docker files")
    return True

def create_deployment_files():
    """Create deployment files."""
    build_path = Path(BUILD_DIR)
    
    # Create Procfile for Heroku
    with open(build_path / "Procfile", "w") as f:
        f.write("web: python -m app.main")
    
    # Create runtime.txt for Heroku
    with open(build_path / "runtime.txt", "w") as f:
        f.write("python-3.10.x")
    
    # Create vercel.json for Vercel
    vercel_json = {
        "version": 2,
        "builds": [
            {
                "src": "app/main.py",
                "use": "@vercel/python"
            }
        ],
        "routes": [
            {
                "src": "/(.*)",
                "dest": "app/main.py"
            }
        ]
    }
    
    with open(build_path / "vercel.json", "w") as f:
        import json
        json.dump(vercel_json, f, indent=2)
    
    print("Created deployment files")
    return True

def main():
    parser = argparse.ArgumentParser(description="Build the application for production")
    parser.add_argument("--clean", action="store_true", help="Clean the build directory")
    parser.add_argument("--docker", action="store_true", help="Create Docker files")
    parser.add_argument("--deploy", action="store_true", help="Create deployment files")
    
    args = parser.parse_args()
    
    # Clean build directory
    clean_build_dir()
    
    # Copy files
    if not copy_files():
        return
    
    # Optimize Python files
    optimize_python_files()
    
    # Create Docker files if requested
    if args.docker:
        create_docker_files()
    
    # Create deployment files if requested
    if args.deploy:
        create_deployment_files()
    
    print("Build completed successfully")

if __name__ == "__main__":
    main()
