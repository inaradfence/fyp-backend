const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getAllProjectsJson,
} = require("../Controllers/Project.js");

debugger;
// Get all projects
// router.get('/api/projects', getAllProjects);
router.route("/api/projects").get(getAllProjects);
router.route("/api/showprojects").get(getAllProjectsJson); //frontend
router.route("/api/project/:id").get(getProjectById); //show edit form
router.route("/api/update-project/:id").post(updateProject);
router.route("/api/delete-project/:id").get(deleteProject);

// Create a new project
router.post("/api/projects", createProject); //working

module.exports = router;
