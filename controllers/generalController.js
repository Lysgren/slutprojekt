const User = require('../models/User')
const bcrypt = require('bcrypt')
const { InvalidBody, InvalidCredentials, DoesNotExist } = require('../errors')

const Authenticate = async(req, res, next) => {
  try {
    const { email, password } = req.body

    if ( !email || !password ) {
      throw new InvalidBody(['email', 'password'])
    }

    const user = await User.findOne({ email })

    if ( !user ) {
      throw new InvalidCredentials()
    }

    const token = await user.Authenticate(password)

    res.json({ message: 'Succesfully logged in', token: token })
  } catch (error) {
    next(error)
  }
}

const GetMe = (req, res) => {
  res.json({ Success: 'Done!', userData: { email: req.email, role: req.role }})
}

const PatchMe = async(req, res, next) => {
  try {
    const { newPassword } = req.body

    if ( !newPassword ) {
      throw new InvalidBody(['newPassword'])
    }

    const user = await User.findOne({ email: req.email })
    if ( !user ) {
      throw new DoesNotExist()
    }
    
    const hashedPassword = bcrypt.hashSync(newPassword, 10)
    await User.updateOne({ email: req.email }, { password: hashedPassword })

    res.json({ message: 'Succesfully changed password' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  Authenticate,
  GetMe,
  PatchMe,
}