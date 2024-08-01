const express = require('express');
const router = express.Router();
const DiscussionController = require('../Controlers/Discussion');

// Create a new discussion
router.post('/', DiscussionController.createDiscussion);

// Get all discussions
router.get('/', DiscussionController.getDiscussions);

// Update a discussion by ID
router.patch('/:id', DiscussionController.updateDiscussion);

// Delete a discussion by ID
router.delete('/:id', DiscussionController.deleteDiscussion);

module.exports = router;
