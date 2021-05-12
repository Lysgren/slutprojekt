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
    validate: async (id) => {
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
    validate: async (id) => {
      const user = await User.findOne({_id: id})
      return user.role === 'CLIENT'
    }
    */
  },
  done: {
    type: Boolean,
    default: false
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

taskSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log(error)
    throw new DatabaseError()
  } else {
    next()
  }
})

module.exports = mongoose.model('Task', taskSchema)