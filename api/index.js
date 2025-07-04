// This file is used by Vercel as a serverless function for API routes
const express = require('express');
const cors = require('cors');
const connectDb = require('../backend/config/dbConnection');
const errorHandler = require('../backend/middleware/errorHandler');
const contactRoutes = require('../backend/routes/contactRoute');
const userRoutes = require('../backend/routes/userRoutes');

// Create express server
const app = express();

// Connect to MongoDB
connectDb();

// Middlewares
app.use(cors());
app.use(express.json());

// Remove the /api prefix from routes since Vercel already routes /api/* to this function
app.use("/contacts", contactRoutes);
app.use("/users", userRoutes);

// Health check routes
app.get('/health', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

app.get('/', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

// Error handling
app.use(errorHandler);

// For Vercel serverless functions
module.exports = app;
