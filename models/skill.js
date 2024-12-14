const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String }, // Added description field
  image: { type: String }, // Added image URL field
});

module.exports = mongoose.model("Skill", skillSchema);
