 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  url: String,
  file: {
    type: String,
    enum: ['video', 'pdf', 'txt', 'excel']
  },
  likes: Number,
  dislikes: Number,
  ideas: [
    {
      text: String,
      username: String,
      email: String,
      likes: Number,
      dislikes: Number
    }
  ]
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

