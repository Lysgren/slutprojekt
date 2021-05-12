const Task = require('../models/Task')
const uuid = require('uuid').v4
const { InvalidParams, DoesNotExist, InvalidBody, Forbidden, WrongMime } = require('../errors')
const { parseQuery } = require("../middleware/parseQuery")
const User = require('../models/User')
const Image = require('../models/Image')

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

const uploadImage = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new InvalidBody(['image'])
    }
    
    const task = await Task.findById(req.params.id)

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
      image: file.data,
      mime: file.mimetype,
      uuid: fileUuid,
      name: file.name,
      task: req.params.id
    })

    await image.save()
    image.image = undefined
    res.status(200).json({
      message: "Cool beans",
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
