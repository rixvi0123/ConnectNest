#!/bin/bash
# Exit on error
set -e

# Install frontend dependencies and build
echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Building frontend..."
npm run build

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../backend
npm install

echo "Build process completed successfully!"
