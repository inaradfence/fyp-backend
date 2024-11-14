const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Sets the date to the current date and time when a document is created
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Annoucement', AnnouncementSchema);
