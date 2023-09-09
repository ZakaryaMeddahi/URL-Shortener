const mongoose = require('mongoose');

const ShortcutSchema = new mongoose.Schema({
  url: {
    type : String,
    required : [true, 'Please provide a url']
  },
  pathname: {
    type : String,
    required : false,
  }
}, { timestamps: true })

module.exports = mongoose.model('Shortcut', ShortcutSchema);