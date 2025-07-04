const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb=require("./config/dbConnection")
const errorhandle = require("./middleware/errorHandler");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
connectDb();

app.use(cors());

app.use(express.json());

// Root route for API health check
app.get('/', (req, res) => {
  res.json({ message: 'ConnectNest API is running' });
});

app.use("/api/contacts",require("./routes/contactRoute"));
app.use("/api/users",require("./routes/userRoutes"));
// Set ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(errorhandle)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


