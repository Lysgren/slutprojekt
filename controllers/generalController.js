// import model
const { InvalidBody, InvalidParam } = require('../errors')
const Login = require('../models/Authenticate')

// Auth User
const Authenticate = async(req, res, next) => {
  try {
    const { email, password } = req.body

    if ( !email || !password ) {
      throw new InvalidBody(['email', 'password'])
    }

    const token = await Login(email, password)
    res.json({ message: 'Succesfully logged in', token: token })
  } catch (error) {
    next(error)
  }
}

// Auth hämta inloggad User
const GetMe = (req, res) => {
  const tokenData = {
    id: req.id,
    email: req.email,
    role: req.role
  }

  console.log('getMe')
  res.json({ message: 'Done', tokenData })
}
// redigera inloggad User
const PatchMe = (req, res) => {
  console.log('patchMe')
  res.json({ message: 'Done' })
}

module.exports = {
  Authenticate,
  GetMe,
  PatchMe,
}