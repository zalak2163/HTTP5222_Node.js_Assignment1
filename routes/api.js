// routes/api.js
const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Skill = require("../models/skill");

// Get all projects with pagination (query string for page number)
router.get("/projects", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 10; // Number of items per page
  try {
    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Get all skills with pagination
router.get("/skills", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 10; // Number of items per page
  try {
    const skills = await Skill.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills" });
  }
});

module.exports = router;
