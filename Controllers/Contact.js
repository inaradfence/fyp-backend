const ContactUs = require('../Models/Contact');

const getAllContacts = async (req, res) => {
  try {
  console.log("contacts");
    const contacts = await ContactUs.find();
    res.render("contacts",{contacts});
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


// Get a contact by ID
const getUserById = async (req, res) => {
  console.log("getUseById here", req.params);
  try {
    const contact = await ContactUs.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    console.log(contact);
    res.render('updatecontact',{contact});
  console.log("rendered");

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  console.log("you will update here");
  try {
    const { firstname, lastname, email, address, institutename, designation, message } = req.body;
    console.log("Request body:", req.params);

    // Find contact by ID and update
    const updatedContact = await ContactUs.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, address, institutename, designation, message },
      { new: true } // Return the updated document
    );
    console.log("update contact", updateContact);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const contacts = await ContactUs.find();
    res.render("contacts",{contacts});

  } catch (err) {
    res.status(500).json({ message: 'Error updating contact' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await ContactUs.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const contacts = await ContactUs.find();
    res.render("contacts",{contacts});
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

module.exports = {
  createContactUs,
  getAllContacts,
  getUserById,
  updateContact,
  deleteContact
};

