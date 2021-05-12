const Task = require('../models/Task')
const { InvalidParams, DoesNotExist } = require('../errors')
const { parseQuery } = require("../middleware/parseQuery")
const User = require('../models/User')

// Admin: Raderar ett ärende
const DeleteTask = async(req, res, next) => {
  try {
    // taskID
    const { id } = req.params
    if ( !id ) {
      throw new InvalidParams(['taskId'])
    }

    const findOne = await Task.findOne({ _id: id })
    if ( !findOne ) {
      throw new DoesNotExist()
    }

    await Task.deleteOne({ _id: id })
    Task.save()
    res.json({ message: `Succesfully deleted task`, deletedTaskId: id })
  } catch (error) {
    next(error)
  }
}

// Worker: Skapar ett nytt ärende
const CreateTask = async (req, res, next) => {
  try {
    // body
    const { title, description, email } = req.body
    if (!title || !description || !email) {
      throw new InvalidBody(['title', 'description', 'client'])
    }
    // clientId
const { _id } = await User.findOne({email})
            // workerID
    const worker = req.id
    const task = new Task({
      title,
      description,
      worker,
      client: _id,
      done: false
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
    // query
    const { page, pageSize, email } = parseQuery(req.query)
    if (!page || !pageSize || !email) {
      throw new InvalidParam(["page", "pageSize", "email"])
    }
    console.log(email)
        // clientId
    const { _id } = await User.findOne({email})
        // workerID
    const worker = req.id
        // taskList
    const taskList = await Task.find({worker, client:_id})
    res.json({ message: 'Done', taskList })
  } catch {
    next(error)
  }
}

// Worker, Client : Hämtar ett ärende
const GetTaskById = async (req, res, next) => {
  try {
    // taskID
    const { id } = req.params
    if (!id) {
      throw new InvalidParam(['id'])
    }
        // task
    const task = await Task.findOne({_id:id})
    res.json({ message: 'Done', task })
  } catch (error) {
    next(error)
  }
}

// Worker: Uppdaterar ett ärende
const PatchTask = async (req, res, next) => {
  try {
    // taskID
    const { id } = req.params
    if (!id) {
      throw new InvalidParam(['id'])
    }
    // body
    const { title, description, email, done } = req.body
    if (!title || !description || !email ) {
      throw new InvalidBody(['title', 'description', 'client'])
    }
    if (done != null) {
      console.log("fake")
    }

    //  || typeof done != Boolean
    // clientId
    const { _id } = await User.findOne({email})
    // workerId
    const worker = req.id
    // task

    const task = await Task.updateOne({_id:id},{
      title,
      description,
      worker,
      client: _id, 
      done
    })
    res.json({ message: 'Done' })
    await task.save()
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
