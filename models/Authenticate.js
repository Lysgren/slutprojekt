require('dotenv').config()
const User = require('./User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('../errors')

const Authenticate = async(email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Unauthorized()
  }

  comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    throw new Unauthorized()
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.ENCRYPTION, { expiresIn:'7d' })
  
  return token
}

module.exports = Authenticate