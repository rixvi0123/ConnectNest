const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection")
const errorhandle = require("./middleware/errorHandler");
const path = require("path");
const fs = require('fs');
// Let Vercel assign the port in production, use default for local dev
const port = process.env.PORT || 5000;
const app = express();
connectDb();

app.use(cors());

app.use(express.json());

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

app.use(errorhandle)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


