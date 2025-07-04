const mongoose = require('mongoose');

// Global MongoDB connection variable
let cachedConnection = null;

const connectDb = async () => {
  // If we already have a connection, use it
  if (cachedConnection) {
    return cachedConnection;
  }
  
  // If no connection exists, create a new one
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      serverSelectionTimeoutMS: 5000,
      // These settings help with Vercel serverless environment
      bufferCommands: false
    });
    
    cachedConnection = connect;
    
    console.log("MongoDB Connected Successfully:", 
      connect.connection.host,
      connect.connection.name
    );
    
    return connect;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // In serverless, don't exit the process
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw err;
  }
};

module.exports = connectDb;
