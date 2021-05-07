const User = require('../models/User')
const { InvalidBody, InvalidParam } = require('../errors')

// Admin, Worker: Listar användare med query params
const GetUsers = async (req, res, next) => {
  const limit = Number(req.query.limit) || 10
  const offset = (Number(req.query.page) - 1) * limit || 0
  const role = req.query.role
  const search = req.query.search
  let users
  try {
    if (role) {
      users = await User.find({role}, {}, { skip: offset, limit })
    } else {
      users = await User.find({}, {}, { skip: offset, limit })
    }
    if (search) {
      const filteredUsers = users.filter(user => user.email.includes(search))
      res.json({ users: filteredUsers })
    } else {
      res.json({ users })
    }
  } catch (error) {
    next(error)
  }
}

// General: Hämtar en användare
const SpecificUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.find({_id: id})
    res.json({user})
  } catch(error) {
    next(error)
  }
}

// Admin: Skapar en ny användare
const RegisterUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body

    if (!email || !password || !role) { throw new InvalidBody() }

    const user = new User({ email, password, role })

    await user.save()

    res.json({ success: 'User was created successfully', user })

  } catch (error) {
    next(error)
  }
}

// Admin: Uppdaterar användaren
const UpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const fields = ['email', 'role']
    const postedFields = fields.filter(field => req.body[field])
    const updateData = {}

    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10)
      updateData.password = hashedPassword
    }

    for (const field of postedFields) {
      updateData[field] = req.body[field]
    }

    await User.updateOne({ _id: id }, updateData)

    res.json({ message: 'Succesfully updated user' })
  } catch (error) {
    next(error)
  }
}

// Admin: Tar bort en användare
const DeleteUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.deleteOne({_id: id})
    res.json({ message: 'Succesfully deleted user' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  GetUsers,
  SpecificUser,
  RegisterUser,
  UpdateUser,
  DeleteUser
}