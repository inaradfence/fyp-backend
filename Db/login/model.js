const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
  
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: ["teacher", "student", "alumni", "admin"],
  },
  address: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;