const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  institutename: {
    type: String
  },
  designation: {
    type: String,
    enum: ['student', 'teacher', 'admin', 'alumni']
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});


const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;
