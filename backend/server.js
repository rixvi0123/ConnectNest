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

// API routes - use these exact paths for Vercel deployment
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));

// API health check endpoints
app.get('/api', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'ConnectNest API server is running' });
});

app.use(errorhandle)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


