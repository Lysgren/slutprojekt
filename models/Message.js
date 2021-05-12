const mongoose = require('mongoose')
const Task = require('./Task')
const { ObjectId } = mongoose.Schema.Types
const { InvalidId, DoesNotExist, InvalidCredentials } = require('../errors')

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
/* 
    validate: async (id) => {
      const task = await Task.findOne({_id: this.task})
      return task.worker == id || task.client == id
    }
     */
  }
})

messageSchema.statics.RightToDelete = function(userRole, originalPoster, userId) {
  if (userRole === 'CLIENT' && !originalPoster.equals(userId)) {
    throw new InvalidCredentials()
  }
}

messageSchema.statics.CheckIfExists = async function(id) {
  const message = await this.findOne({ _id: id })

  if ( !message ) {
    throw new DoesNotExist()
  }

  return message
}

messageSchema.statics.CheckId = function(id) {
  const validId = mongoose.Types.ObjectId.isValid(id)

  if ( !validId ) {
    throw new InvalidId()
  }
}

messageSchema.statics.GetPage = async function(taskId, page, pageSize) {
  page = page * pageSize

  const messages = await this.find({ task: taskId }, {}, { limit: pageSize, skip: page } ).sort({ 'date': -1 })
  return messages
}

module.exports = mongoose.model('Message', messageSchema)