const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  counter: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Member', participantSchema)