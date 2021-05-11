const mongoose = require('mongoose')
const Task = require('./Task')
const { ObjectId } = mongoose.Schema.Types

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  writtenAt: {
    type: Date,
    default: Date.now
  },
  task: {
    type: ObjectId,
    ref: 'Task',
    required: true
  },
  from: {
    type: ObjectId,
    ref: 'User',
    required: true, 
    validate: async function (id) {
      const task = await Task.findOne({_id: this.task})
      return task.worker.toString() == id || task.client.toString() == id
    }
     
  }
})

module.exports = mongoose.model('Message', messageSchema)