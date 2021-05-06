// import model
const { InvalidBody, InvalidParam } = require('../errors')

// Auth User
const Authenticate = (req, res) => {
  console.log('auth')
  res.json({message: 'Done'})
}

// Auth hämta inloggad User
const GetMe = (req, res) => {
  console.log('getMe')
  res.json({message: 'Done'})
}
// redigera inloggad User
const PatchMe = (req, res) => {
  console.log('patchMe')
  res.json({message: 'Done'})
}

module.exports = {
  Authenticate,
  GetMe,
  PatchMe,
}