const Task = require('../models/Task')
const { InvalidParams, DoesNotExist } = require('../errors')

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
const CreateTask = (req, res, next) => {
  console.log('CreateTask')
  res.json({message: 'Done'})
}

// Worker, Clients: Hämtar arbetarens ärenden
const GetTasks = (req, res, next) => {
  console.log('GetWorkerTasks')
  res.json({message: 'Done'})
}

// Worker, Client : Hämtar ett ärende
const GetTaskById = (req, res, next) => {
  console.log('GetTask')
  res.json({message: 'Done'})
}

// Worker: Uppdaterar ett ärende
const PatchTask = (req, res, next) => {
  console.log('PatchTask')
  res.json({message: 'Done'})
}

module.exports = {
  DeleteTask,
  CreateTask,
  GetTasks,
  GetTaskById,
  PatchTask
}