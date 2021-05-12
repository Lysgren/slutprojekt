class KnegError extends Error {}

class InvalidBody extends KnegError {
  // 400 Bad request
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid Body, required fields: ${this.fields.join(', ')}`
    this.statusCode = 400
  }
}

class InvalidParams extends KnegError {
  // 400 Bad request
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid Params, require fields: ${this.fields.join(', ')}`
    this.statusCode = 400
  }
}

class InvalidQuery extends KnegError {
  // 400 Bad request
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid Query, values cant be negative: ${this.fields.join(', ')}`
    this.statusCode = 400
  }
}

class BadRole extends KnegError {
  // 403 Forbidden
  constructor() {
    super()
    this.message = 'You do not have access to this function'
    this.statusCode = 403
  }
}

class InvalidCredentials extends KnegError {
  // 403 Forbidden
  constructor() {
    super()
    this.message = 'Invalid credentials, you do not have access to this'
    this.statusCode = 403
  }
}

class InvalidToken extends KnegError {
  // 403 Forbidden
  constructor() {
    super()
    this.message = 'Invalid token'
    this.statusCode = 403
  }
}

class NoAuthorization extends KnegError {
  // 400 Bad request
  constructor() {
    super()
    this.message = 'No authorization given in request',
    this.statusCode = 400
  }
}

class Unauthorized extends KnegError {
  // 401 Unauthorized
  constructor() {
    super()
    this.message = 'Unauthorized, Maybe better luck next time.'
    this.statusCode = 401
  }
}

class UserExists extends KnegError {
  // 401 Unauthorized
  constructor() {
    super()
    this.message = 'Error, user already exists'
    this.statusCode = 401
  }
}

class DoesNotExist extends KnegError {
  // 404 Does not exist
  constructor() {
    super()
    this.message = 'Error, the resource does not exist'
    this.statusCode = 404
  }
}

class InvalidId extends KnegError {
    // 400 Bad request
    constructor() {
      super()
      this.message = 'Error, supplied Id is invalid'
      this.statusCode = 400
    }
}

class DatabaseError extends KnegError {
  // 500 Internal Server Error
  constructor() {
    super()
    this.message = 'Something unexpected is happening to the database'
    this.statusCode = 500
  }
}

module.exports = {
  KnegError,
  InvalidBody,
  InvalidParams,
  InvalidQuery,
  BadRole,
  InvalidCredentials,
  InvalidToken,
  NoAuthorization,
  Unauthorized,
  UserExists,
  DoesNotExist,
  InvalidId,
  DatabaseError
}
