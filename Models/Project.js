const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  file: {
    type: String,
  },
  user: {
    type: String,
    required: true
  }
}, { timestamps: true });  // Adds createdAt and updatedAt automatically

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
