const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Skill = require("../models/skill");

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Get all skills
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills" });
  }
});

module.exports = router;
