const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

// MongoDB connection (ensure your MongoDB URI is set correctly)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Routes
app.use("/admin", require("../routes/admin")); // Make sure routes are correct
app.use("/api", require("../routes/api")); // Ensure routes are valid

// Export the function for Netlify to handle the app
module.exports.handler = serverless(app);
