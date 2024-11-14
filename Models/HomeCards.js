const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

module.exports = mongoose.model('HomeCard', CardsSchema);
