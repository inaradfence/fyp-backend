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

const getAnnouncementById = async (req, res) => {
  console.log("getCourseById here", req.params);

    try {
      const announcement = await Announcement.findById(req.params.id);
  
      if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      console.log(announcement);
      res.render("updateannouncement", { announcement }); // Render the announcement
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching the announcement',
        error: err.message
      });
    }
  };
  
// Update an announcement by ID
const updateAnnouncement = async (req, res) => {
  console.log("you will update here");
     try {
        const { title, description} = req.body;
         console.log("Request body:", req.params);
        const updatedAnnouncement = await Announcement.findByIdAndUpdate( 
      req.params.id,
      { title, description },
      { new: true }); // Return the updated document

        if (!updatedAnnouncement) {
            return res.status(404).json({
                message: 'Announcement not found'
            });
        }
        const announcements = await Announcement.find();
        res.render("announcement",{announcements});
    } catch (err) {
        res.status(500).json({
            message: 'Error updating announcement',
            error: err.message
        });
    }
};

// Delete an announcement by ID
const deleteAnnouncement = async (req, res) => {
      try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

        if (!deletedAnnouncement) {
            return res.status(404).json({
                message: 'Announcement not found'
            });
        }
        const announcements = await Announcement.find();
        res.render("announcement",{announcements});
       
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting announcement',
            error: err.message
        });
    }
};

module.exports = {
    getAnnouncementsJson,
    getAnnouncementById,
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};
