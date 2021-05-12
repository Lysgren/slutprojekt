const Task = require('../models/Task')
const Message = require('../models/Message')
const { InvalidBody, InvalidParams, InvalidCredentials, InvalidQuery, DoesNotExist } = require('../errors')

const MessageAuth = async(taskId, clientId, role) => {
  const task = await Task.findOne({ _id: taskId })
  if ( !task ) {
    throw new DoesNotExist()
  }

  if (role === 'CLIENT' && !task.client.equals(clientId)) {
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

    const page = Number(req.query.page) || 0
    const pageSize = Number(req.query.pageSize) || 20
    if (page < 0 || pageSize < 0) {
      throw new InvalidQuery(['page', 'pageSize'])
    }

    Message.CheckId(taskId)

    await MessageAuth(taskId, req.id, req.role)
    let response = await Message.GetPage(taskId, page, pageSize)

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
    if ( !taskId ) {
      throw new InvalidParams(['taskId'])
    }

    await MessageAuth(taskId, req.id, req.role)
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
      if ( !msg_id ) {
        throw new InvalidParams(['msg_id'])
      }

      // Check if supplied msg_id is valid Mongoose id
      Message.CheckId(msg_id)

      // Check if the message exists
      const message = await Message.CheckIfExists(msg_id)

      // Check if the user has the right to delete the message (admin and workers can delete all messages while clients can only delete their own messages)
      Message.RightToDelete(req.role, message.from, req.id)

      // Deletes the message
      await Message.deleteOne({ _id: msg_id })
 
      res.json({ message: 'Message was deleted' })
    } catch (error) {
      next(error)
    }

  }

module.exports = {
  PostMessageById,
  GetMessageById,
  DeleteMessageById
}