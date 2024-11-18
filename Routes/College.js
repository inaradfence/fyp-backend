const express = require('express');
const router = express.Router();
const CollegeController = require('../Controllers/College');

// Route to create a new college
router.post('/api/createColleges', CollegeController.createCollege);

// Route to get all colleges
router.get('/api/colleges', CollegeController.getAllColleges);
router.get('/api/all-colleges', CollegeController.getAllCollegeJson);

// Route to get a specific college by ID
router.get('/api/college/:id', CollegeController.getCollegeById);

// Route to update a college by ID
router.post('/api/update-college/:id', CollegeController.updateCollege);

// Route to delete a college by ID
router.get('/api/delete-college/:id', CollegeController.deleteCollege);

// Route to search for colleges by name
router.get('/api/colleges/search/:id', CollegeController.searchColleges);
module.exports = router;
