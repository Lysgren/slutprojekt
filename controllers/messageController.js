const Message = require('../models/Message')
const { parseQuery } = require('../middleware/parseQuery')

const { InvalidBody, InvalidParams, InvalidCredentials, DoesNotExist } = require('../errors')
const Task = require('../models/Task')

const MessageAuth = async(taskId, clientId, role) => {
  const task = await Task.findOne({ _id: taskId })
  if ( !task ) {
    throw new DoesNotExist()
  }

  if (role === 'CLIENT' && !task.client.equals(clientId)) {
    console.log('Throwing error')
    throw new InvalidCredentials()
  }
}

// Worker, Clienter: Hämtar meddelanden från ett specifikt ärende
const GetMessageById = async(req, res, next) => {
  try {
    const taskId = req.params.taskId
    if ( !taskId ) {
      throw new InvalidParams(['taskId'])
    }
    
    // const { page, pageSize } = parseQuery(req.query)
    // console.log(page, pageSize)

    let response = await Message.find({ task: taskId })

    await MessageAuth(taskId, req.id, req.role)

    if (response.length == 0) {
      response = 'No messages found'
    }

    res.json({ message: 'Messages found to task', response })
  } catch (error) {
    next(error)
  }
}

// Worker, Clienter: Postar meddelanden till ett ärende
const PostMessageById = async(req, res, next) => {
  try {
    const { messageText } = req.body
    if ( !messageText ) {
      throw new InvalidBody(['messageText'])
    }

    const taskId = req.params.taskId
    if (!taskId) {
      throw new InvalidParams(['taskId'])
    }

    const auth = await MessageAuth(taskId, req.id, req.role)
    if ( !auth ) {
      throw new InvalidCredentials()
    }

    const message = new Message({
      message: messageText,
      from: req.id,
      task: taskId
    })

    const response = await message.save()
    res.json({ message: 'Succesfully posted message!', response })

  } catch (error) {
    next(error)
  }
}

// Worker, Clienter: Raderar meddelanden från ärenden
  const DeleteMessageById = async(req, res, next) => {
    try {
      const msg_id = req.params.msg_id
      if (!msg_id) {
        throw new InvalidParams(['id'])
      }

      const message = await Message.findOne({ _id: msg_id })
      console.log(message)

      console.log(req.id)
      console.log(message.from)

      if (message.from != req.id) {
        throw new InvalidCredentials()
      }
  
      const response = await Message.deleteOne({ _id: msg_id })
      res.json({ message: 'Message was deleted', response })

    } catch (error) {
      next(error)
    }

  }

module.exports = {
  PostMessageById,
  GetMessageById,
  DeleteMessageById
}