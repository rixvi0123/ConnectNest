#!/bin/bash
# Exit on error
set -e

# Install dependencies at the root level
echo "Installing root dependencies..."
npm install

# Install frontend dependencies and build
echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Building frontend..."
npm run build
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Copy frontend build to public folder for easy access
echo "Copying frontend build to public folder..."
mkdir -p public
cp -r frontend/build/* public/

echo "Build process completed successfully!"
