// import model
const { InvalidBody, InvalidParam } = require('../errors')

const Authenticate = (req, res) => {
  console.log('auth')
  res.json({message: 'Done'})
}

const GetMe = (req, res) => {
  console.log('getMe')
  res.json({message: 'Done'})
}

const PatchMe = (req, res) => {
  console.log('patchMe')
  res.json({message: 'Done'})
}

const Users = (req, res) => {
  console.log('users')
  res.json({message: 'Done'})
}

const SpecificUser =  (req, res) => {
  console.log('specificUser')
  res.json({message: 'Done'})
}

module.exports = {
  Authenticate,
  GetMe,
  PatchMe,
  Users,
  SpecificUser
}