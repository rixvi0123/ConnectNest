// This file is used by Vercel as a serverless function for API routes
const express = require('express');
const cors = require('cors');
const connectDb = require('../backend/config/dbConnection');
const errorHandler = require('../backend/middleware/errorHandler');
const contactRoutes = require('../backend/routes/contactRoute');
const userRoutes = require('../backend/routes/userRoutes');

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// API health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

// Basic root response
app.get('/api', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

app.use(errorHandler);

module.exports = app;
