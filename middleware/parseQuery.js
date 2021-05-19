const { InvalidQuery, RequestLimit } = require('../errors/index')

module.exports = (req, res, next) => {
  req.limit = Number(req.query.limit) || 10
  req.offset = (Number(req.query.page) - 1) * req.limit || 0

  if (req.limit >= 1000) {
    throw new RequestLimit()
  }

  if ( req.offset < 0 || req.limit < 0 ) {
    throw new InvalidQuery(['page', 'limit'])
  }
  next()
}