const Task = require('../models/Task')

// Admin: Raderar ett ärende
const DeleteTask = (req, res, next) => {
  console.log('DeleteTasks')
  res.json({message: 'Done'})
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