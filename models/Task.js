const mongoose = require('mongoose')
const User = require('./User')
const { Schema } = mongoose
const { DatabaseError, DoesNotExist, InvalidCredentials } = require('../errors')

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
    required: true,
/* 
    validate: async function (id) {
      const user = await User.findOne({_id: id})
      return user.role === 'WORKER'
    }
 */
  },
  client: {
    type: ObjectId,
    ref: 'User',
    required: true,
/* 
    validate: async function (id) {
      const user = await User.findOne({_id: id})
      return user.role === 'CLIENT'
    }
 */
  },
  done: {
    type: Boolean
  }
})

taskSchema.statics.RightToTask = function(userRole, taskClient, userId) {
  if (userRole === 'CLIENT' && !taskClient.equals(userId)) {
    throw new InvalidCredentials()
  }
}

taskSchema.statics.CheckIfExists = async function(id) {
  const task = await this.findOne({ _id: id })

  if ( !task ) {
    throw new DoesNotExist()
  }

  return task
}

module.exports = mongoose.model('Task', taskSchema)