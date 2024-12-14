const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import multer
const path = require("path");
const Project = require("../models/project");
const Skill = require("../models/skill");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Folder to store the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Filter for valid image file types (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

// Initialize multer with storage options and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to add a new project (GET)
router.get("/add-project", (req, res) => {
  res.render("admin/addProject"); // Renders the addProject.pug view
});

// Route to add a new project (POST)
router.post("/add-project", (req, res) => {
  const { title, description, link, deadline, category } = req.body;

  // Basic validation for required fields
  if (!title || !description || !deadline || !category) {
    return res.status(400).send("All fields are required.");
  }

  const newProject = new Project({
    title,
    description,
    link,
    deadline,
    category,
  });

  newProject
    .save()
    .then(() => res.redirect("/admin/projects")) // Redirect to projects list after saving
    .catch((err) => res.status(400).send("Error saving project: " + err));
});

// Route to view projects (use async/await here)
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({}); // Fetch all projects
    res.render("admin/projects", { projects }); // Pass projects data to the view
  } catch (err) {
    res.status(500).send("Error fetching projects: " + err);
  }
});

// Route to add a new skill (GET)
router.get("/add-skill", (req, res) => {
  res.render("admin/addSkill"); // Renders the addSkill.pug view
});

// Route to add a new skill (POST) with file upload
router.post("/add-skill", upload.single("image"), (req, res) => {
  const { name, level, description } = req.body;

  // Check if the required fields are provided
  if (!name || !level || !description) {
    return res.status(400).send("All fields are required.");
  }

  // Get the image URL if an image is uploaded
  let imageUrl = "";
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`; // Store the image URL in the DB
  }

  // Create a new skill object
  const newSkill = new Skill({
    name,
    level,
    description,
    image: imageUrl, // Store the image URL
  });

  // Save the skill to the database
  newSkill
    .save()
    .then(() => res.redirect("/admin/skills")) // Redirect to the skills list after saving
    .catch((err) => res.status(400).send("Error saving skill: " + err));
});

// Route to view skills (use async/await here)
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find({}); // Fetch all skills
    res.render("admin/skills", { skills }); // Pass skills data to the view
  } catch (err) {
    res.status(500).send("Error fetching skills: " + err);
  }
});

module.exports = router;
