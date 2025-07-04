const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const errorhandle = require("./middleware/errorHandler");
const path = require("path");
const fs = require('fs');

// Create Express app
const app = express();

// Connect to MongoDB (only connect once in dev mode)
if (process.env.NODE_ENV !== 'production') {
  connectDb();
}

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? [/\.vercel\.app$/, /localhost/] : true,
  credentials: true
}));
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

// Serve static files from the React build
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  console.log('Serving frontend from:', frontendBuildPath);
  
  // Serve static files
  app.use(express.static(frontendBuildPath));
  
  // For any other route, serve the React app
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  console.log('Frontend build not found at:', frontendBuildPath);
  // Root endpoint as fallback
  app.get('/', (req, res) => {
    res.json({ message: 'ConnectNest API server is running, but frontend build is not available' });
  });
}

app.use(errorhandle);

// In development, start the server
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export the Express app for serverless environments (Vercel)
module.exports = app;


