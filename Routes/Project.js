const express = require('express');
const router = express.Router();
const { 
  getAllProjects, 
  createProject, 
  getProjectById, 
  updateProject, 
  deleteProject 
} =require('../Controllers/Project.js');

// Get all projects
// router.get('/api/projects', getAllProjects); 
router.route("/api/projects").get(getAllProjects);
router.route("/api/project/:id").get(getProjectById); //show edit form
router.route("/api/update-project/:id").post(updateProject); 

// Create a new project
router.post('/api/projects', createProject); //not working





// Get a project by ID
router.get('/projects/:id', (req, res) => {
  res.json(res.project);
});

// Delete a project
router.get('/api/delete-projects/:id', deleteProject);

module.exports = router;


