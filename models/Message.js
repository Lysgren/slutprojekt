const mongoose = require('mongoose')
const Task = require('./Task')
const { ObjectId } = mongoose.Schema.Types
const { DoesNotExist, Forbidden } = require('../errors')

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
  }
})

messageSchema.statics.RightToDelete = function(userRole, originalPoster, userId) {
  if (userRole === 'CLIENT' && !originalPoster.equals(userId)) {
    throw new Forbidden()
  }
}

messageSchema.statics.CheckIfExists = async function(id) {
  const message = await this.findOne({ _id: id })

  if ( !message ) {
    throw new DoesNotExist()
  }

  return message
}

module.exports = mongoose.model('Message', messageSchema)