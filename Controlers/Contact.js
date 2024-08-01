const ContactUs = require('../modles/Contact');

 const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const createContactUs = async (req, res) => {
  try {
    const { firstname, lastname, address, institutename, designation, email, message } = req.body;
    const contactUs = new ContactUs({ firstname, lastname, address, institutename, designation, email, message });
    await contactUs.save();
    res.send({ message: 'Contact us data saved successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error saving contact us data' });
  }
};

module.exports={
  createContactUs,getAllContacts

}