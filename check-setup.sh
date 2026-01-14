#!/bin/bash

# Setup verification script for Smart Attendance System
# This script checks if all requirements are met

echo "========================================="
echo "Smart Attendance System - Setup Checker"
echo "========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Not found"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} Not found"
    exit 1
fi

# Check if node_modules exists
echo -n "Checking dependencies... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}!${NC} Not installed"
    echo "Run: npm install"
fi

# Check if models directory exists
echo -n "Checking face recognition models... "
if [ -d "public/models" ] && [ "$(ls -A public/models)" ]; then
    MODEL_COUNT=$(ls -1 public/models | wc -l)
    echo -e "${GREEN}✓${NC} Found $MODEL_COUNT files"
else
    echo -e "${YELLOW}!${NC} Not found"
    echo "Run: ./download-models.sh"
fi

# Check if .env exists
echo -n "Checking configuration file... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}!${NC} Using defaults"
    echo "Optional: cp .env.template .env"
fi

# Summary
echo ""
echo "========================================="
echo "Setup Status Summary"
echo "========================================="

if [ -d "node_modules" ] && [ -d "public/models" ] && [ "$(ls -A public/models)" ]; then
    echo -e "${GREEN}All checks passed! You're ready to start.${NC}"
    echo ""
    echo "To start the development server, run:"
    echo "  npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
else
    echo -e "${YELLOW}Some setup steps are missing.${NC}"
    echo ""
    echo "Complete the following steps:"
    [ ! -d "node_modules" ] && echo "  1. npm install"
    [ ! -d "public/models" ] || [ ! "$(ls -A public/models)" ] && echo "  2. ./download-models.sh"
    echo ""
fi
