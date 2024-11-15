const express = require('express');
const router = express.Router();
const announcementController = require ('../Controllers/Announcement');

// Route to create a new announcement
router.post('/api/createAnnouncement', announcementController.createAnnouncement);

// Route to get all announcements
router.get('/getAnnouncement', announcementController.getAnnouncements);
router.get('/api/all-Announcement', announcementController.getAnnouncementsJson);//frontend route

// Route to update an announcement by ID
router.get('/Announcement/:id', announcementController.getAnnouncementById);
router.post('/updateAnnouncement/:id', announcementController.updateAnnouncement);

// Route to delete an announcement by ID
router.get('/deleteAnnouncement/:id', announcementController.deleteAnnouncement);

module.exports = router;
