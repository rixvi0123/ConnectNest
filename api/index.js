// This file is the serverless function entry point for Vercel
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

// Create Express app for serverless
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection handling
let cachedDb = null;

async function connectToDatabase() {
  // If we already have a connection and it's active, reuse it
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return cachedDb;
  }
  
  try {
    console.log('Connecting to MongoDB...');
    // Prevent multiple parallel connection attempts
    if (mongoose.connection.readyState === 2) {
      console.log('Connection is already in progress');
      await new Promise(resolve => {
        mongoose.connection.once('connected', () => resolve());
        mongoose.connection.once('error', () => resolve());
      });
      if (mongoose.connection.readyState === 1) {
        cachedDb = mongoose.connection;
        return cachedDb;
      }
    }

    // Connect with proper error handling
    const connection = await mongoose.connect(process.env.CONNECTION_STRING, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      family: 4 // Force IPv4
    });
    
    cachedDb = connection;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Import routes
const contactRoutes = require('../backend/routes/contactRoute');
const userRoutes = require('../backend/routes/userRoutes');

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ConnectNest API is running' });
});

// Error handling middleware
const errorHandler = require('../backend/middleware/errorHandler');
app.use(errorHandler);

// Serverless handler
module.exports = async (req, res) => {
  // Handle API requests only - frontend is handled by Vercel's static file serving
  if (!req.url.startsWith('/api/')) {
    return res.status(404).json({ 
      error: 'Not Found', 
      message: 'This endpoint only handles API requests. Frontend routes should be handled by Vercel static file routing.'
    });
  }
  
  try {
    // Connect to database before proceeding
    await connectToDatabase();
    
    // Pass the request to the Express app
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
