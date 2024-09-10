const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // for parsing JSON request bodies
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
