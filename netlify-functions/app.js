const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

// MongoDB connection (make sure your MongoDB URI is set correctly in the .env file)
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
app.use("/admin", require("./routes/admin")); // Ensure this path is correct
app.use("/api", require("./routes/api")); // Ensure this path is correct

// Export app as a serverless function
module.exports.handler = serverless(app);