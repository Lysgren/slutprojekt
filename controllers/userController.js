const User = require('../models/User')
const { InvalidBody, InvalidParam } = require('../errors')

// Admin, Worker: Listar användare med query params
const GetUsers = (req, res) => {
  console.log('users')
  res.json({message: 'Done'})
}

// General: Hämtar en användare
const SpecificUser =  (req, res) => {
  console.log('specificUser')
  res.json({message: 'Done'})
}

// Admin: Skapar en ny användare
const RegisterUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body

    if ( !email || !password || !role ) { throw new InvalidBody() }

    const user = new User({ email, password, role })

    await user.save()

    res.json({success: 'User was created successfully', user })

  } catch (error) {
    next(error)
  }
}

// Admin: Uppdaterar användaren
const UpdateUser = (req, res) => {
  console.log('update')
  res.json({message: 'Done'})
}

// Admin: Tar bort en användare
const DeleteUser = (req, res) => {
  console.log('delete')
  res.json({message: 'Done'})
}

module.exports = {
  GetUsers,
  SpecificUser,
  RegisterUser,
  UpdateUser,
  DeleteUser
}