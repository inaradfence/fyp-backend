const mongoose = require('mongoose');

// Define the schema
const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false, // Optional, in case no image is provided
    trim: true
  }
}, {
  timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the model from the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
