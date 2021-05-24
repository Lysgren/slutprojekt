const Task = require('../models/Task')
const uuid = require('uuid').v4
const { InvalidParams, DoesNotExist, InvalidBody, Forbidden, WrongMime } = require('../errors')
const User = require('../models/User')
const Image = require('../models/Image')

// Admin: Raderar ett ärende
const DeleteTask = async(req, res, next) => {
  try {
    console.log('Delete task')
    
    const { id } = req.params
    if ( !id ) {
      throw new InvalidParams(['taskId'])
    }

    const findOne = await Task.findOne({ _id: id })
    if ( !findOne ) {
      throw new DoesNotExist()
    }

    await Task.deleteOne({ _id: id })

    res.json({ message: `Succesfully deleted task no ${id}` })
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
    const { email, done } = req.query
    let taskList

    const id = req.id
    const role = req.role

    const queryFilter = {}
    if (role === 'CLIENT') {
      queryFilter.client = id
    } else if (role === 'WORKER') {
      queryFilter.worker = id
    }

    if (!email || req.role === 'CLIENT') {
      taskList = await Task.find(queryFilter, {}, { skip: req.offset, limit: req.limit })
    } else {
      const user = await User.findOne({email})
      if ( !user ) {
        throw new DoesNotExist()
      }

      taskList = await Task.find({ worker: id, client: user._id }, {}, { skip: req.offset, limit: req.limit })
    }
    
    if (done === 'true') {
      taskList = taskList.filter(task => task.done)
    } else if (done === 'false') {
      taskList = taskList.filter(task => !task.done)
    }

    res.json({ message: 'Done', taskList })
  } catch (error) {
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

    const task = await Task.findOne({ _id : id })
    if (!task) {
      throw new DoesNotExist()
    }

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

    const fields = ['title', 'description', 'email', 'done']
    const postedFields = fields.filter(field => req.body[field])
    
    if (postedFields.length === 0) {
      return res.status(400).json({error: `Provide something to change: ${fields.join(', ')}`})
    }

    const updateData = {}

    for (const field of postedFields) {
      updateData[field] = req.body[field]
    }

    // workerId
    const worker = req.id

    const task = await Task.updateOne({_id: id, worker}, updateData)
    res.json({ message: 'Done' })
    await task.save()
  } catch {
    next(error)
  }
}

const uploadImage = async (req, res, next) => {
  try {
    if (!req.files.image) {
      throw new InvalidBody(['image'])
    }
    
    const task = await Task.CheckIfExists(req.params.id)

    if (req.id != task.worker.toString()) {
      throw new Forbidden() 
    }
    
    const file = req.files.image
    const mime = file.mimetype.split('/')

    if (mime[0] != 'image') {
      throw new WrongMime()
    }

    const fileUuid = uuid()
    file.mv(`./images/${fileUuid}.${mime[1]}`)

    const image = new Image({
      mime: file.mimetype,
      uuid: fileUuid,
      name: file.name,
      task: req.params.id
    })

    await image.save()
    res.status(200).json({
      message: 'Image uploaded',
      image
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  DeleteTask,
  CreateTask,
  GetTasks,
  GetTaskById,
  PatchTask,
  uploadImage
}
