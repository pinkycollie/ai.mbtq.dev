#!/bin/bash

# Setup script for Replit environment
echo "Setting up Replit environment..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p logs
mkdir -p data
mkdir -p app/models

# Set up environment variables
echo "Setting up environment variables..."
if [ ! -f ".env" ]; then
  echo "Creating .env file..."
  cp .env.example .env
  
  # Generate a random secret key
  SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
  sed -i "s/your-secret-key-here/$SECRET_KEY/g" .env
  
  echo "Please update the .env file with your specific configuration."
fi

# Set up database (if applicable)
# echo "Setting up database..."
# python -m app.db.init_db

echo "Setup complete! Run 'python -m app.main' to start the application."
