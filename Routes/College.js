const express = require('express');
const router = express.Router();
const CollegeController = require('../Controllers/College');

// Route to create a new college
router.post('/api/colleges', CollegeController.createCollege);

// Route to get all colleges
router.get('/api/colleges', CollegeController.getAllColleges);

// Route to get a specific college by ID
router.get('/api/colleges/:id', CollegeController.getCollegeById);

// Route to update a college by ID
router.put('/api/colleges/:id', CollegeController.updateCollege);

// Route to delete a college by ID
router.delete('/api/colleges/:id', CollegeController.deleteCollege);

module.exports = router;
