const mongoose = require('mongoose')
const { Schema } = mongoose

const { ObjectId } = mongoose.Schema.Types

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  worker: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Task', taskSchema)