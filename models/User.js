const mongoose = require('mongoose')
const { Schema } = mongoose
const { UserExists } = require('../errors')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
/* 
    validate: (value) => {
      return validator.isEmail(value)
    }
 */
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'WORKER', 'CLIENT'],
    required: true
  }
})

userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    throw new UserExists()
  } else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)