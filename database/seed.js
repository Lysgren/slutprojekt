const User = require('../models/User')
const Task = require('../models/Task')

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

    const skurt = await SeedUsers('Skurt@Skurtsson.se', 'password', 'ADMIN')
    const david = await SeedUsers('David@Davidsson', 'password', 'WORKER')
    const bananpaj = await SeedUsers('Bananpaj@Bananpaj', 'password', 'WORKER')
    const grillkorv = await SeedUsers('Grillkorv@Grillkorv', 'password', 'WORKER')
    const simon = await SeedUsers('Simon@Simon.com', 'password', 'CLIENT')
    const oscar = await SeedUsers('Oscar@Lysse.se', 'password', 'CLIENT')
    const elias = await SeedUsers('Elias@Elias.se', 'password', 'CLIENT')
  
    const taskOne = await SeedTasks('Big house', 'Its an awesome house with lots of rooms', david._id, simon._id)
    const taskTwo = await SeedTasks('Pie', 'Bake a bananpaj', bananpaj._id, oscar._id)
    const taskThree = await SeedTasks('Hotdog', 'Grilla korv', grillkorv._id, elias._id)
    const taskFour = await SeedTasks('Workstuff', 'aaaaaaaaaaaaaaaaaa', david._id, elias._id)

    // const badTask = await SeedTasks('I am wrong!', 'Client does not exist', bananpaj._id, 1337)
  
    // console.log(elias._id)
  } catch (error) {
    console.log(error)
  }
}

module.exports = main