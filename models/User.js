const mongoose = require('mongoose')
const { Schema } = mongoose

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

module.exports = mongoose.model('User', userSchema)