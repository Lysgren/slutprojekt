require('dotenv').config()
const jwt = require('jsonwebtoken')
const { NoAuthorization, InvalidRole, InvalidToken } = require('../errors/index')

const correctToken = (authorization) => {
  if (!authorization) {
    throw new NoAuthorization()
  }
  
  const token = authorization.replace('Bearer ', '')

  try {
    const { id, email, role } = jwt.verify(token, process.env.ENCRYPTION)
    return { id, email, role }
  } catch (error) {
    throw new InvalidToken()
  }
}

const Auth = (...roles) => {
  return (req, res, next) => {
    try {
      const { id, email, role } = correctToken(req.headers.authorization)

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