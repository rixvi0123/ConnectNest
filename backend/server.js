const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection")
const errorhandle = require("./middleware/errorHandler");
const path = require("path");
// Let Vercel assign the port in production, use default for local dev
const port = process.env.PORT || 5000;
const app = express();
connectDb();

app.use(cors());

app.use(express.json());

// API routes
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));

// API health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

// For Vercel deployment, we'll handle frontend routing differently
// The frontend routes will be handled by Vercel's routing system via vercel.json


app.use(errorhandle)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


