#!/bin/bash
# Install frontend dependencies and build
cd frontend
npm install
npm run build

# Copy frontend build to public folder for Vercel
mkdir -p ../public
cp -r build/* ../public/

# Install backend dependencies
cd ../backend
npm install
