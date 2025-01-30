const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/Config/db");
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
