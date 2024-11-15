const express = require('express');
const router = express.Router();

const  { createContactUs,
    getAllContacts,
    getUserById,
    updateContact,
    deleteContact} =require( '../Controllers/Contact');

// Get all contact us messages
router.get('/getContact', getAllContacts);

router.post('/api/contact', createContactUs);

// Middleware to get contact us message by ID
router.get('/contact-us/:id', getUserById );

router.post('/update-contact/:id', updateContact );

// Delete a contact us message
router.get('/delete-contact/:id', deleteContact);

module.exports = router;


