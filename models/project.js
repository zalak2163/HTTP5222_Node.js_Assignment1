const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  deadline: { type: Date }, // Added field for deadline
  category: { type: String }, // Added field for category
});

module.exports = mongoose.model("Project", projectSchema);
