# PowerShell Build Script
# Exit on error
$ErrorActionPreference = "Stop"

# Install dependencies at the root level
Write-Host "Installing root dependencies..." -ForegroundColor Green
npm install

# Install frontend dependencies and build
Write-Host "Installing frontend dependencies..." -ForegroundColor Green
Set-Location -Path frontend
npm install
Write-Host "Building frontend..." -ForegroundColor Green
npm run build
Set-Location -Path ..

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Green
Set-Location -Path backend
npm install
Set-Location -Path ..

# Copy frontend build to public folder for easy access
Write-Host "Copying frontend build to public folder..." -ForegroundColor Green
if (!(Test-Path -Path "public")) {
    New-Item -ItemType Directory -Path "public"
}
Copy-Item -Path "frontend/build/*" -Destination "public/" -Recurse -Force

# Create an example .env file if one doesn't exist
if (!(Test-Path -Path ".env")) {
    Write-Host "Creating example .env file..." -ForegroundColor Yellow
    @"
# Server Configuration
PORT=5001
NODE_ENV=production

# MongoDB Connection
CONNECTION_STRING=your_mongodb_connection_string

# JWT Secret
ACCESS_TOKEN_SECRET=your_jwt_secret_key
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "Created .env file. Make sure to update with your actual values." -ForegroundColor Yellow
}

Write-Host "Build process completed successfully!" -ForegroundColor Green
Write-Host "NOTE: To deploy to Vercel, make sure to set up the following environment variables:" -ForegroundColor Cyan
Write-Host "  - CONNECTION_STRING (MongoDB connection string)" -ForegroundColor Cyan
Write-Host "  - ACCESS_TOKEN_SECRET (JWT secret for authentication)" -ForegroundColor Cyan
