const Project = require('../modles/Project');

// Create a new project
 const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);  // 201 Created status code
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get all projects
 const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single project by ID
 const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;  // Get ID from URL parameters
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a project by ID
 const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;  // Get ID from URL parameters
    const project = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a project by ID
 const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;  // Get ID from URL parameters
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.send({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports={
  deleteProject,updateProject,getProjectById,getProjects,createProject
}