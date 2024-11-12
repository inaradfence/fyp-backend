const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema(
  {
    collegeName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',  // Assuming courses are stored in a 'Course' collection
      }
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('College', CollegeSchema);
