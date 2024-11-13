const express = require('express');
const router = express.Router();

const  {createContactUs,getAllContacts,} =require( '../Controllers/Contact');

// Get all contact us messages
router.get('/getContact', getAllContacts);

// Create a new contact us message
console.log('contact route is going great');

router.post('/api/contact', createContactUs);

// Middleware to get contact us message by ID
// router.use('/contact-us/:id', getContactUsMessageById);

// Update a contact us message
// router.patch('/contact-us/:id', updateContactUsMessage);

// Get a contact us message by ID
// router.get('/contact-us/:id', (req, res) => {
//   res.json(res.contactUsMessage);
// });

// Delete a contact us message
// router.delete('/contact-us/:id', deleteContactUsMessage);

module.exports = router;


