require('dotenv').config()
const jwt = require('jsonwebtoken')
const { NoAuthorization, InvalidRole, InvalidToken } = require('../errors/index')

const correctToken = (token) => {
  try {
    if (!token) {
      throw new NoAuthorization()
    }

    const { id, email, role } = jwt.verify(token, process.env.ENCRYPTION)
    return { id, email, role }
  } catch (error) {
    throw new InvalidToken()
  }
}

const Auth = (...roles) => {
  return (req, res, next) => {
    try {
      if ( !req.headers.authorization ) {
        throw new NoAuthorization()
      }

      const token = req.headers.authorization.replace('Bearer ', '')
      const { id, email, role } = correctToken(token)

      if ( roles.includes(role) ) {
        req.id = id
        req.email = email
        req.role = role
        next()
      } else {
        throw new InvalidRole()
      }
    } catch(error) {
      next(error)
    }
  }
}

module.exports = Auth