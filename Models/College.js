
const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    location: { type: String, required: true },
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('College', CollegeSchema);
