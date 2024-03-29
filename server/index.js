const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/config/db"); // Import the connectDB
const authRoutes = require("./src/routes/authRoutes"); // Import auth routes
const taskRoutes = require("./src/routes/taskRoutes"); // Import task routes
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    withCredentials: true,
    methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
// app.use(express.json()); // Can be used instead of body-parser.

// MongoDB Connection
connectDB();

app.get("/", function (req, res) {
  res.status(200).send({ message: "working" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
