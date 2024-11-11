const Project = require('../modles/Project');

console.log("Create a new project");

 const createProject = async (req, res) => {
  console.log("Create a new project");
  try {   
    const {
      title,
      description,
      url,
      file,
      createdAt// Optional, will default to Date.now if not provided
    }=req.body;

console.log("project created");

const project = new Project({
  title,
  url,
  file,
  createdAt
});
console.log("Received project:", req.body);
    await project.save();
    res.status(201).send( {message: "Successfully project created"});
    console.log("Project save");

  } catch (err) {
       res.status(500).send({ message: "Failed to create project", error: err });
  }
};


// Get all projects
 const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
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
  deleteProject,updateProject,getProjectById,getAllProjects,createProject
}