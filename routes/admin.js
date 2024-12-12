const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Skill = require("../models/skill");

// Admin Page to add Project
router.get("/add-project", (req, res) => {
  res.render("admin/addProject");
});

// Admin Page to add Skill
router.get("/add-skill", (req, res) => {
  res.render("admin/addSkill");
});

// Handle POST request to add a project
router.post("/add-project", async (req, res) => {
  const { title, description, link } = req.body;
  const project = new Project({ title, description, link });
  await project.save();
  res.redirect("/admin/projects"); // Redirect to the projects list
});

// Handle POST request to add a skill
router.post("/add-skill", async (req, res) => {
  const { name, level } = req.body;
  const skill = new Skill({ name, level });
  await skill.save();
  res.redirect("/admin/skills"); // Redirect to the skills list
});

// Get all projects
router.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.render("admin/projects", { projects });
});

// Get all skills
router.get("/skills", async (req, res) => {
  const skills = await Skill.find();
  res.render("admin/skills", { skills });
});

module.exports = router;
