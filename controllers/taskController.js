const Task = require('../models/Task')
const { InvalidParams, DoesNotExist } = require('../errors')
const { parseQuery } = require("../middleware/parseQuery")

// Admin: Raderar ett ärende
const DeleteTask = async(req, res, next) => {
  try {
    const { id } = req.params
    if ( !id ) {
      throw new InvalidParams(['taskId'])
    }

    const findOne = await Task.findOne({ _id: id })
    if ( !findOne ) {
      throw new DoesNotExist()
    }

    await Task.deleteOne({ _id: id })

    res.json({ message: `Succesfully deleted task`, deletedTaskId: id })
  } catch (error) {
    next(error)
  }
}

// Worker: Skapar ett nytt ärende
const CreateTask = async (req, res, next) => {
  try {
    const { title, description, email } = req.body
    if (!title || !description || !email) {
      throw new InvalidBody(['title', 'description', 'client'])
    }
    const worker = req.id
    const { _id } = await User.findOne({email})
    const task = new Task({
      title,
      description,
      worker,
      client: _id,
    })

    await task.save()

    res.json({ message: 'Done', task })
  } catch (error) {
    next(error)
  }
}

// Worker, Clients: Hämtar arbetarens ärenden
const GetTasks = async (req, res, next) => {
  try {
    const { page, pageSize, email } = parseQuery(req.query)
    if (!page || !pageSize || !email) {
      throw new InvalidParam(["page", "pageSize", "email"])
    }
    console.log(email)
    const { _id } = await User.findOne({email})
    const worker = req.id
    // , client:_id => lyckas inte filtrera på client
    const taskList = await Task.find({worker})
    res.json({ message: 'Done', taskList })
  } catch {
    next(error)
  }
}

// Worker, Client : Hämtar ett ärende
const GetTaskById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      throw new InvalidParam(['id'])
    }
    const task = await Task.findOne({_id:id})
    console.log(task)
    res.json({ message: 'Done', task })
  } catch (error) {
    next(error)
  }
}

// Worker: Uppdaterar ett ärende
const PatchTask = (req, res, next) => {
  try {
    // body title ? description ? worker id ?
    const { id } = req.params
    if (!id) {
      throw new InvalidParam(['id'])
    }
    // patch model Task update
    res.json({ message: 'Done' })
  } catch {
    next(error)
  }
}

module.exports = {
  DeleteTask,
  CreateTask,
  GetTasks,
  GetTaskById,
  PatchTask,
}
