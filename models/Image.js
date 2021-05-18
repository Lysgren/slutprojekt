const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  mime: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  task: {
    type: ObjectId,
    ref: 'Task',
    required: true
  }
})

module.exports = mongoose.model('Image', imageSchema)