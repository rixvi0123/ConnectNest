const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "MongoDB Connected Successfully:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  } 
  
};

module.exports = connectDb;
