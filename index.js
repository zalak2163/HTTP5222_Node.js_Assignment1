const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors()); // Enable CORS for all routes and origins

// If you want to restrict to your React app's URL only, use this instead:
// app.use(cors({
//   origin: 'http://localhost:5173'  // Allow only React app on localhost
// }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public")); // Static files

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Routes
app.use("/admin", require("./routes/admin")); // Admin routes for adding projects/skills
app.use("/api", require("./routes/api")); // API routes (if needed)

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server on dynamic port or 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
