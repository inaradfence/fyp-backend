const Announcement = require('../Models/Announcement');
// Create a new announcement
const createAnnouncement = async (req, res) => {
    const { title, description } = req.body;
       try {
        const newAnnouncement = new Announcement({
            title,
            description,
        });
        await newAnnouncement.save();
        res.redirect('/getAnnouncement');
        console.log("annocemfghj   4");
    } catch (err) {
        res.status(500).json({
                    
            message: 'Error creating announcement',
            error: err.message
        });
        console.log("error in annoucemect");   
    }
};

// Fetch all announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.render("announcement",{announcements});
        console.log(announcements);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching announcements',
            error: err.message
        });
    }
};
//Frontend
const getAnnouncementsJson = async (req, res) => {
    try {
        console.log("announcements");
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
        console.log(announcements);
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
    getAnnouncementsJson,
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};
