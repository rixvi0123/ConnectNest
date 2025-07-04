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

// Root and API health routes
app.get('/', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

// Serve static frontend files from build folder
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  
  // Handle SPA routing - all non-API routes go to index.html
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}


app.use(errorhandle)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


