const { InvalidBody, InvalidParam, DatabaseError } = require('../errors')
const User = require('../models/User')

const RegisterUser = async (req, res, next) => {
  try {
    console.log('Controller register user')

    const { email, password, role } = req.body

    if ( !email || !password || !role ) {
      res.json({ error: 'Body needs email, password and role' })
    }

    const user = new User({
      email,
      password,
      role
    })

    const test = await user.save()

    console.log(test)

    res.json({success: 'Shit is working!', user })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const UpdateUser = (req, res) => {
  console.log('update')
  res.json({message: 'Done'})
}

const DeleteUser = (req, res) => {
  console.log('delete')
  res.json({message: 'Done'})
}

const DeleteTask = (req, res) => {
  console.log('Task deleted')
  res.json({message: 'Done'})
}

module.exports = {
  RegisterUser,
  UpdateUser,
  DeleteUser,
  DeleteTask
}