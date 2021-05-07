const { KnegError } = require('../errors/index')
const mongoose = require('mongoose')

const errorHandler = (error, req, res, next) => {
  if (error instanceof KnegError) {
    res.status(error.statusCode).json({ error: error.message })
  } else if (error instanceof mongoose.Error) {
    res.status(error.statusCode).json({ error: error.message })
  } else if (error.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'Invalid JSON' })
  } else {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong, please contact your system admin' })
  }
}

module.exports = errorHandler