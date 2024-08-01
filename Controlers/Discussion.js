const Discussion = require('../modles/Discussion');

// Create a new discussion
exports.createDiscussion = async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    await discussion.save();
    res.status(201).json(discussion);  // 201 Created status code
  } catch (err) {
    res.status(500).json({ message: 'Error creating discussion: ' + err.message });
  }
};

// Get all discussions
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('user');
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discussions: ' + err.message });
  }
};

// Update a discussion by ID
exports.updateDiscussion = async (req, res) => {
  try {
    const discussionId = req.params.id;  // Get ID from URL parameters
    const updatedDiscussion = await Discussion.findByIdAndUpdate(discussionId, req.body, { new: true }).populate('user');
    if (!updatedDiscussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.json(updatedDiscussion);
  } catch (err) {
    res.status(500).json({ message: 'Error updating discussion: ' + err.message });
  }
};

// Delete a discussion by ID
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussionId = req.params.id;  // Get ID from URL parameters
    const deletedDiscussion = await Discussion.findByIdAndRemove(discussionId);
    if (!deletedDiscussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.json({ message: 'Discussion deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting discussion: ' + err.message });
  }
};
