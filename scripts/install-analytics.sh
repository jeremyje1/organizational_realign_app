#!/bin/bash
# Install dependencies for analytics features

# Terminal colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Installing dependencies for analytics features...${NC}"

# Install CSV generation package
echo -e "${GREEN}Installing csv-writer for analytics exports...${NC}"
npm install csv-writer --save

# Update Prisma if needed
echo -e "${GREEN}Updating Prisma client...${NC}"
npx prisma generate

# Apply database migrations
echo -e "${GREEN}Applying database migrations...${NC}"
npx prisma migrate dev --name add_collaboration_events

echo -e "${BLUE}All dependencies installed successfully!${NC}"
echo -e "${BLUE}Run 'npm run dev' to start the development server${NC}"
