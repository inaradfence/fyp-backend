 const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type : String,
    required : true,
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
  createdAt: { 
    type: Date, 
    default: Date.now },
  
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

