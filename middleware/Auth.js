require('dotenv').config()
const jwt = require('jsonwebtoken')
const { NoAuthorization, BadRole, InvalidToken } = require('../errors/index')

const correctToken = (authorization) => {
  if (!authorization) {
    throw new NoAuthorization()
  }
  
  const token = authorization.replace('Bearer ', '')
  const { id, email, role } = jwt.verify(token, process.env.ENCRYPTION)
  return { id, email, role }
}

const Client = (req, res, next) => {
  try {
    const { id, email, role } = correctToken(req.headers.authorization)
    
    if (role === 'CLIENT' || role === 'WORKER' || role === 'ADMIN') {
      req.id = id
      req.email = email
      req.role = role
      next()
    } else {
      throw new BadRole()
    }
  } catch (error) {
    next(error)
  }
}

const Worker = (req, res, next) => {
  try {
    const { id, email, role } = correctToken(req.headers.authorization)

    if (role === 'WORKER' || role === 'ADMIN') {
      req.id = id
      req.email = email
      req.role = role
      next()
    } else {
      throw new BadRole()
    }
  } catch (error) {
    next(error)
  }
}

const Admin = (req, res, next) => {
  try {
    const { id, email, role } = correctToken(req.headers.authorization)
    
    if (role === 'ADMIN') {
      req.id = id
      req.email = email
      req.role = role
      next()
    } else {
      throw new BadRole()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  Client,
  Worker,
  Admin
}