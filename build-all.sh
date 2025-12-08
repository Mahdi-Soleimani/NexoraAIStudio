#!/bin/bash
set -e

echo "🏗️  Building NexoraAIStudio Sites..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
rm -rf py1/dist

# Build main site
echo "📦 Building main site..."
npm run build:main

# Build py1 site
echo "📦 Building py1 site..."
cd py1
npm install
npm run build
cd ..

# Copy py1 build into main dist/py1/
echo "🔗 Merging py1 into main deployment..."
mkdir -p dist/py1
cp -r py1/dist/* dist/py1/

echo "✅ Build complete! Output in dist/"
echo "   - Main site: dist/"
echo "   - py1 site: dist/py1/"
