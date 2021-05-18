class AppError extends Error {}

class InvalidBody extends AppError {
  // 400 Bad request
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid Body, required fields: ${this.fields.join(', ')}`
    this.statusCode = 400
  }
}

class InvalidParams extends AppError {
  // 400 Bad request
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid Params, require fields: ${this.fields.join(', ')}`
    this.statusCode = 400
  }
}

class InvalidQuery extends AppError {
  // 400 Bad request
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid Query, values cant be negative: ${this.fields.join(', ')}`
    this.statusCode = 400
  }
}

class InvalidRole extends AppError {
  // 403 Forbidden
  constructor() {
    super()
    this.message = 'You do not have access to this function'
    this.statusCode = 403
  }
}

class InvalidCredentials extends AppError {
  // 401 Unauthorized
  constructor() {
    super()
    this.message = 'Invalid credentials, you do not have access to this'
    this.statusCode = 401
  }
}

class InvalidToken extends AppError {
  // 403 Forbidden
  constructor() {
    super()
    this.message = 'Invalid token'
    this.statusCode = 403
  }
}

class NoAuthorization extends AppError {
  // 400 Bad request
  constructor() {
    super()
    this.message = 'No authorization given in request',
    this.statusCode = 400
  }
}

class Forbidden extends AppError {
  // 403 Forbidden
  constructor() {
    super()
    this.message = 'Forbidden'
    this.statusCode = 403
  }
}

class UserExists extends AppError {
  // 400 Bad Request
  constructor() {
    super()
    this.message = 'Error, user already exists'
    this.statusCode = 400
  }
}

class DoesNotExist extends AppError {
  // 404 Does not exist
  constructor() {
    super()
    this.message = 'Error, the resource does not exist'
    this.statusCode = 404
  }
}

class DatabaseError extends AppError {
  // 500 Internal Server Error
  constructor() {
    super()
    this.message = 'Something unexpected is happening to the database'
    this.statusCode = 500
  }
}

class RequestLimit extends AppError {
  constructor() {
    super()
    this.message = 'Bad request. The request limit is 1000.'
    this.statusCode = 400
  }
}

class WrongMime extends AppError {
  constructor() {
    super()
    this.message = 'Only images are allowed to upload'
    this.statusCode = 400
  }
}

module.exports = {
  AppError,
  InvalidBody,
  InvalidParams,
  InvalidQuery,
  InvalidRole,
  InvalidCredentials,
  InvalidToken,
  NoAuthorization,
  UserExists,
  DoesNotExist,
  DatabaseError,
  Forbidden,
  RequestLimit,
  WrongMime
}
