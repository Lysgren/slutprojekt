const mongoose = require('mongoose')

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongod = new MongoMemoryServer()

const DatabaseConnection = async() => {
  const uri = await mongod.getUri()
  const options = { useNewUrlParser: true, useUnifiedTopology: true }
  mongoose.set('useCreateIndex', true);
  console.log('Connection established to database')
  return mongoose.connect(uri, options)
}

module.exports = DatabaseConnection