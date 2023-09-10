const mongoose = require('mongoose');

const ShortcutSchema = new mongoose.Schema({
  url: {
    type : String,
    required : [true, 'Please provide a url']
  },
  pathname: {
    type : String,
    required : [true, 'Please provide a pathname'],
    unique: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required:[true, 'Please select the user who has created this shortcut'],
  }
}, { timestamps: true })

module.exports = mongoose.model('Shortcut', ShortcutSchema);