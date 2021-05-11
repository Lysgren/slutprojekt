const mongoose = require('mongoose')
const User = require('./User')
const { Schema } = mongoose
const { DatabaseError } = require('../errors')

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
// skurt
taskSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log(error)
    throw new DatabaseError()
  } else {
    next()
  }
})

module.exports = mongoose.model('Task', taskSchema)