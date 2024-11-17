const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


console.log('schema is here');

const userSchema = new mongoose.Schema({
  
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
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  picture:{
    type:String
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: ["Teacher", "Student", "Alumni"],
  },
  address: {
    type: String,
    },
  institute: {
    type: String,
    required: true,
  },
});


userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
      next()
  }

  const hashedpassword = await bcrypt.hash(this.password, 10);

  this.password = hashedpassword;

})


userSchema.methods.getjsonwebtoken = async function () {

  const token = await jwt.sign({ id: this._id }, 'secret', {
      expiresIn: '7d'
  });

  return token

}


// Create the User model from the schema
const User = new mongoose.model("User", userSchema); 
module.exports = User;

