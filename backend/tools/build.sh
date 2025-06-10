#!/bin/bash

# Build Helper Script
# This script provides a user-friendly interface for building the application

# Colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is required but not installed.${NC}"
    exit 1
fi

# Check if the build script exists
if [ ! -f "tools/build.py" ]; then
    echo -e "${RED}Error: build.py not found in tools directory.${NC}"
    exit 1
fi

# Display menu
echo -e "${BLUE}=== Build Tool ===${NC}"
echo -e "${YELLOW}1.${NC} Build for production"
echo -e "${YELLOW}2.${NC} Build with Docker files"
echo -e "${YELLOW}3.${NC} Build with deployment files"
echo -e "${YELLOW}4.${NC} Build with Docker and deployment files"
echo -e "${YELLOW}5.${NC} Exit"
echo ""

# Get user choice
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "${GREEN}Building for production...${NC}"
        python3 tools/build.py
        ;;
    2)
        echo -e "${GREEN}Building with Docker files...${NC}"
        python3 tools/build.py --docker
        ;;
    3)
        echo -e "${GREEN}Building with deployment files...${NC}"
        python3 tools/build.py --deploy
        ;;
    4)
        echo -e "${GREEN}Building with Docker and deployment files...${NC}"
        python3 tools/build.py --docker --deploy
        ;;
    5)
        echo -e "${BLUE}Exiting...${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice. Please enter a number between 1 and 5.${NC}"
        exit 1
        ;;
esac
