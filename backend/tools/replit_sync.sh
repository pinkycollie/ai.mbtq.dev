#!/bin/bash

# Replit Sync Helper Script
# This script provides a user-friendly interface for syncing with Replit

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

# Check if the sync script exists
if [ ! -f "tools/replit_sync.py" ]; then
    echo -e "${RED}Error: replit_sync.py not found in tools directory.${NC}"
    exit 1
fi

# Display menu
echo -e "${BLUE}=== Replit Sync Tool ===${NC}"
echo -e "${YELLOW}1.${NC} Sync local files TO Replit"
echo -e "${YELLOW}2.${NC} Sync files FROM Replit to local"
echo -e "${YELLOW}3.${NC} Watch for changes and auto-sync to Replit"
echo -e "${YELLOW}4.${NC} Sync environment variables to Replit"
echo -e "${YELLOW}5.${NC} Exit"
echo ""

# Get user choice
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "${GREEN}Syncing local files to Replit...${NC}"
        python3 tools/replit_sync.py --to
        ;;
    2)
        echo -e "${GREEN}Syncing files from Replit to local...${NC}"
        python3 tools/replit_sync.py --from
        ;;
    3)
        echo -e "${GREEN}Watching for changes and auto-syncing to Replit...${NC}"
        python3 tools/replit_sync.py --watch
        ;;
    4)
        echo -e "${GREEN}Syncing environment variables to Replit...${NC}"
        python3 tools/replit_sync.py --env
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
