#!/bin/bash

# Deployment script for Northpath Strategies app

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Northpath Strategies Deployment Script${NC}"
echo "========================================"
echo

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI not found${NC}"
    echo "Please install Vercel CLI using: npm i -g vercel"
    exit 1
fi

# Check if we're logged in
echo -e "${YELLOW}Verifying Vercel authentication...${NC}"
vercel whoami || {
    echo -e "${RED}Not logged in to Vercel. Please login:${NC}"
    vercel login
}

# Ensure environment variables are set properly
echo -e "${YELLOW}Checking environment variables...${NC}"
vercel env pull .env.production || {
    echo -e "${RED}Failed to pull environment variables${NC}"
    echo "Make sure you have the necessary permissions and try again"
    exit 1
}

# Generate Prisma client with latest schema
echo -e "${YELLOW}Generating Prisma client...${NC}"
npx prisma generate || {
    echo -e "${RED}Failed to generate Prisma client${NC}"
    exit 1
}

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npm run build || {
    echo -e "${RED}Build failed${NC}"
    exit 1
}

# Deploy to production
echo -e "${YELLOW}Deploying to production...${NC}"
echo -e "This will deploy to ${GREEN}northpathstrategies.org${NC} and ${GREEN}app.northpathstrategies.org${NC}"

# Confirm deployment
read -p "Continue with production deployment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deploying...${NC}"
    vercel --prod || {
        echo -e "${RED}Deployment failed${NC}"
        exit 1
    }
    
    echo -e "${GREEN}Deployment successful!${NC}"
    echo "Waiting for DNS propagation and testing endpoints..."
    
    # Wait a bit for DNS propagation
    sleep 10
    
    # Test key endpoints
    echo -e "${YELLOW}Testing deployment status endpoint...${NC}"
    curl -s "https://app.northpathstrategies.org/api/deployment-status" | grep "status"
    
    echo -e "${YELLOW}\nTesting Socket.IO endpoint...${NC}"
    curl -s "https://app.northpathstrategies.org/api/socket" | grep "Socket.IO"
    
    echo -e "${GREEN}\nDeployment complete and endpoints tested!${NC}"
    echo "You may need to wait a few minutes for all DNS changes to propagate fully."
else
    echo -e "${YELLOW}Deployment cancelled${NC}"
fi
