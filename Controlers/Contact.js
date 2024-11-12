const ContactUs = require('../Models/Contact');

const getAllContacts = async (req, res) => {
  try {
  console.log("contacts");
    const contacts = await ContactUs.find();
    res.json(contacts);
  console.log(contacts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createContactUs = async (req, res) => {
  try {
    const { firstname, lastname, email, address, institutename, designation, message } = req.body;

    // Create a new ContactUs instance
    const contactUs = new ContactUs({
      firstname, 
      lastname, 
      address, 
      institutename, 
      designation, 
      email, 
      message
    });
    console.log("Received data:", req.body);
   await contactUs.save();
   res.send({ message: 'Contact us data saved successfully' });
  } catch (err) {
    // Log the error for debugging
    console.error('Error during save:', err);
    res.status(500).send({ message: 'Error saving contact us data' });
  }
};  


module.exports={
  createContactUs,getAllContacts

}