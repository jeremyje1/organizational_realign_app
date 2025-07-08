#!/bin/bash
# Secure development environment setup script for NorthPath Strategies

echo "🔒 Setting up secure development environment for NorthPath Strategies..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git and try again."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check node version (require 16+)
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📄 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please fill in the required environment variables"
else
    echo "ℹ️ .env.local already exists, skipping creation"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up git hooks
echo "🔄 Setting up git hooks..."
chmod +x .git/hooks/pre-commit || true

# Check if git-crypt is installed for secret encryption
if command -v git-crypt &> /dev/null; then
    echo "✅ git-crypt found, setting up encryption for sensitive files"
    # Initialize git-crypt if not already initialized
    if [ ! -f .git-crypt/keys/default ]; then
        git-crypt init
        echo "✅ git-crypt initialized"
    fi
else
    echo "⚠️ git-crypt not found. Consider installing it for better handling of sensitive files."
    echo "   Learn more: https://github.com/AGWA/git-crypt"
fi

# Run security checks
echo "🔍 Running security checks..."
npm run security:audit || true

echo "🔍 Running dependency checks..."
npm audit || true

# Information about development environments
echo "
🚀 Development Environment Setup Complete!

✅ Commands you can run:
- npm run dev - Start the development server
- npm run build - Build the application
- npm run lint - Run linting checks
- npm run test - Run tests
- npm run security:check - Run security checks

⚠️ Security Notes:
- Never commit .env files or API keys to the repository
- Use environment variables for all sensitive information
- Run 'npm run security:check' before committing code
- Follow the security guidelines in docs/SECURITY_BEST_PRACTICES.md

📘 Documentation:
- README.md - General project information
- docs/SECURITY_BEST_PRACTICES.md - Security guidelines
- docs/VERCEL_DEPLOYMENT_SECURITY.md - Deployment guide

For any questions, contact the project maintainer.
"

exit 0
