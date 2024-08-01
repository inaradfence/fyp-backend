const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  file: {
    type: String,
    enum: ['url', 'pdf', 'txt', 'excel']
  }, // URL or file path
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);
