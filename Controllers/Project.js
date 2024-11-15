const Project = require('../Models/Project');

console.log("Create a new project");

 const createProject = async (req, res) => {
  console.log("Create a new project");
  try {   
    const {
      title,
      description,
      url,
      file,
      username
     
    }=req.body;

console.log("project created");

const project = new Project({
  title,
  description,
  url,
  file,
  username
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
    res.render('projects', { projects } );
    console.log("prject diplayed");
      } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single project by ID
 const getProjectById = async (req, res) => {
  console.log("getProjecctById here", req.params);

  try {
    const projectId = req.params.id;  // Get ID from URL parameters
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    console.log(project);
    res.render('updateprojects',{project});
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a project by ID
 const updateProject = async (req, res) => {
  console.log("you will update here");
  try {
    const { title, description, url, file, username} = req.body;
    console.log("Request body:", req.params);   
     const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, url, file, username }, 
      { new: true});
    console.log("update project", project);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    const projects = await Project.find();
    res.render('projects', { projects } );
    console.log("prject diplayed", project);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a project by ID
 const deleteProject = async (req, res) => {
  try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send({ message: 'Project not found' });
    }

    const projects = await Project.find();
    res.render('projects', { projects } );
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports={
  deleteProject,updateProject,getProjectById,getAllProjects,createProject
};