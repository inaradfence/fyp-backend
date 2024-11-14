const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
  
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
   
  },
  address: {
    type: String
  },
  institutename: {
    type: String
  },
  designation: {
    type: String,
    enum: ['Student', 'Teacher','Alumni']
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
