const User = require('../models/User')
const Task = require('../models/Task')
const bcrypt = require('bcrypt')

const SeedUsers = async (email, password, role) => {
  const user = new User({
    email,
    password,
    role
  })

  return await user.save()
}

const SeedTasks = async (title, description, worker, client) => {
  const task = new Task({
    title,
    description,
    worker,
    client
  })
  return await task.save()
}

const main = async () => {
  try {
    console.log('Seeding Users')

    const skurt = await SeedUsers('Skurt@Skurtsson.se', bcrypt.hashSync('password', 10), 'ADMIN')
    const david = await SeedUsers('David@Davidsson', bcrypt.hashSync('password', 10), 'WORKER')
    const bananpaj = await SeedUsers('Bananpaj@Bananpaj', bcrypt.hashSync('password', 10), 'WORKER')
    const grillkorv = await SeedUsers('Grillkorv@Grillkorv', bcrypt.hashSync('password', 10), 'WORKER')
    const simon = await SeedUsers('Simon@Simon.com', bcrypt.hashSync('password', 10), 'CLIENT')
    const oscar = await SeedUsers('Oscar@Lysse.se', bcrypt.hashSync('password', 10), 'CLIENT')
    const elias = await SeedUsers('Elias@Elias.se', bcrypt.hashSync('password', 10), 'CLIENT')
  
    const taskOne = await SeedTasks('Big house', 'Its an awesome house with lots of rooms', david._id, simon._id)

    const taskTwo = await SeedTasks('Pie', 'Bake a bananpaj', bananpaj._id, oscar._id)
    const taskThree = await SeedTasks('Hotdog', 'Grilla korv', grillkorv._id, elias._id)
    const taskFour = await SeedTasks('Workstuff', 'aaaaaaaaaaaaaaaaaa', david._id, elias._id)

  } catch (error) {
    console.log(error)
  }
}

module.exports = main