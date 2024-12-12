const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }, // e.g., Beginner, Intermediate, Expert
});

module.exports = mongoose.model("Skill", skillSchema);
