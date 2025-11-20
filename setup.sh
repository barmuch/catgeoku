#!/bin/bash

# catgeoku Installation Script
# This script sets up the development environment

echo "🚀 catgeoku Setup Script"
echo "========================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎨 Setting up Tailwind CSS..."
# Tailwind is already configured, just ensure it's ready
echo "✅ Tailwind CSS configured"

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "3. Start customizing:"
echo "   - Edit app/layout.js for site metadata"
echo "   - Add posts to content/posts/"
echo "   - Modify components in components/"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - DEPLOYMENT.md - Deployment instructions"
echo ""
echo "🎉 Happy coding!"
