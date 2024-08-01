const express = require('express');
const router = express.Router();
import { 
  createResource, 
  getResources, 
  getResource, 
  updateResource, 
  deleteResource, 
  downloadResource, 
  searchResources 
} from '../Controlers/Resource.js';

// Get all resources
router.get('/resources', getResources);

// Create a new resource
router.post('/resources', createResource);

// Get a single resource by ID
router.get('/resources/:id', getResource);

// Update a resource by ID
router.patch('/resources/:id', updateResource);

// Delete a resource by ID
router.delete('/resources/:id', deleteResource);

// Download a resource file
router.get('/resources/:id/download', downloadResource);

// Search for resources
router.get('/resources/search', searchResources);

module.exports = router;
