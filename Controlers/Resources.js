const Resource = require ("../modles/Resources");

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);  // 201 Created status code
  } catch (err) {
    res.status(500).json({ message: 'Error creating resource: ' + err.message });
  }
};

// Get all resources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('user');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resources: ' + err.message });
  }
};

// Get a single resource by ID
exports.getResource = async (req, res) => {
  try {
    const resourceId = req.params.id;  // Get ID from URL parameters
    const resource = await Resource.findById(resourceId).populate('user');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resource: ' + err.message });
  }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
  try {
    const resourceId = req.params.id;  // Get ID from URL parameters
    const updatedResource = await Resource.findByIdAndUpdate(resourceId, req.body, { new: true }).populate('user');
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(updatedResource);
  } catch (err) {
    res.status(500).json({ message: 'Error updating resource: ' + err.message });
  }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;  // Get ID from URL parameters
    const deletedResource = await Resource.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting resource: ' + err.message });
  }
};

// Download a resource file
exports.downloadResource = async (req, res) => {
  try {
    const resourceId = req.params.id;  // Get ID from URL parameters
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    // Check if file path is valid
    if (!resource.file) {
      return res.status(400).json({ message: 'No file associated with this resource' });
    }
    
    res.download(resource.file, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error downloading file: ' + err.message });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing download request: ' + err.message });
  }
};

// Search for resources by title or description
exports.searchResources = async (req, res) => {
  try {
    const query = req.query.q || '';  // Get search query from query parameters
    const resources = await Resource.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('user');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Error searching resources: ' + err.message });
  }
};
