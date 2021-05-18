require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const { Schema } = mongoose
const { UserExists, InvalidCredentials } = require('../errors')

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

userSchema.methods.Authenticate = function (password) {
  comparePassword = bcrypt.compareSync(password, this.password)
  if ( !comparePassword ) {
    throw new InvalidCredentials()
  }

  const token = jwt.sign({ id: this._id, email: this.email, role: this.role }, process.env.ENCRYPTION, { expiresIn:'7d' })
  
  return token
}

module.exports = mongoose.model('User', userSchema)