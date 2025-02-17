const Task = require('../models/Task')
const Message = require('../models/Message')
const { InvalidBody, InvalidParams } = require('../errors')

// Worker, Clienter: Hämtar meddelanden från ett specifikt ärende
const GetMessageById = async(req, res, next) => {
  try {
    const taskId = req.params.taskId
    if ( !taskId ) {
      throw new InvalidParams(['taskId'])
    }

    // Check if the task exists
    const task = await Task.CheckIfExists(taskId)

    // Check if the user has the right to post messages to the task
    Task.RightToTask(req.role, task.client, req.id)

    const messages = await Message.find({ task: taskId }, {}, { skip: req.offset, limit: req.limit }).sort({ 'date': -1 })
    
    if (messages.length == 0) {
      response = 'No messages found.'
    }

    res.json({ message: 'Messages found to task', messages })
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

    // Check if the task exists
    const task = await Task.CheckIfExists(taskId)

    // Check if the user has the right to post messages to the task
    Task.RightToTask(req.role, task.client, req.id)

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