const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  createProject, 
  getProjectById, 
  updateProject, 
  deleteProject 
} =require('../Controlers/Project.js');

// Get all projects
router.get('/projects', getProjects);

// Create a new project
router.post('/projects', createProject);

// Middleware to get project by ID
router.use('/projects/:id', getProjectById);

// Update a project
router.patch('/projects/:id', updateProject);

// Get a project by ID
router.get('/projects/:id', (req, res) => {
  res.json(res.project);
});

// Delete a project
router.delete('/projects/:id', deleteProject);

module.exports = router;


