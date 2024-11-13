const express = require('express');
const router = express.Router();
const announcementController = require ('../Controllers/Announcement');

// Route to create a new announcement
router.post('/createAnnouncement', announcementController.createAnnouncement);

// Route to get all announcements
router.get('/getAnnouncement', announcementController.getAnnouncements);

// Route to update an announcement by ID
router.put('/updateAnnouncement/:id', announcementController.updateAnnouncement);

// Route to delete an announcement by ID
router.delete('/deleteAnnouncement/:id', announcementController.deleteAnnouncement);

module.exports = router;
