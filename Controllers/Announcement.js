const Schema = require('../Models/Announcement'); // Adjust the path if necessary

// Create a new announcement
const createAnnouncement = async (req, res) => {
    const { title, description } = req.body;

    try {
        // Create a new schema instance
        const newAnnouncement = new Schema({
            title,
            description,
        });

        // Save the announcement to the database
        await newAnnouncement.save();

        res.status(201).json({
            message: 'Announcement created successfully',
            announcement: newAnnouncement
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating announcement',
            error: err.message
        });
    }
};

// Fetch all announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Schema.find();
        res.status(200).json({
            announcements
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching announcements',
            error: err.message
        });
    }
};

// Update an announcement by ID
const updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedAnnouncement = await Schema.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true }); // Return the updated document

        if (!updatedAnnouncement) {
            return res.status(404).json({
                message: 'Announcement not found'
            });
        }

        res.status(200).json({
            message: 'Announcement updated successfully',
            announcement: updatedAnnouncement
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating announcement',
            error: err.message
        });
    }
};

// Delete an announcement by ID
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAnnouncement = await Schema.findByIdAndDelete(id);

        if (!deletedAnnouncement) {
            return res.status(404).json({
                message: 'Announcement not found'
            });
        }

        res.status(200).json({
            message: 'Announcement deleted successfully',
            announcement: deletedAnnouncement
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting announcement',
            error: err.message
        });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};
