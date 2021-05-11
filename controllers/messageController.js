const Message = require('../models/Message')
const { parseQuery } = require('../middleware/parseQuery')

const { InvalidBody, InvalidParams, InvalidCredentials } = require('../errors')
const Task = require('../models/Task')


const MessageAuth = async(taskId, clientId, role) => {
  const task = await Task.findOne({ _id: taskId })

  if (role === 'CLIENT' && task.client != clientId) {
    return false
  }

  return true
}

// Worker, Clienter: Hämtar meddelanden från ett specifikt ärende
const GetMessageById = async(req, res, next) => {
  try {
    const taskId = req.params.taskId

    if (!taskId) {
      throw new InvalidParams(['taskId'])
    }
    
    // const { page, pageSize } = parseQuery(req.query)
    // console.log(page, pageSize)

    let response = await Message.find({ task: taskId } )

    const auth = await MessageAuth(taskId, req.id, req.role)
    console.log('authentication to se is ', auth)

    if ( !auth ) {
      throw new InvalidCredentials()
    }

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
    if (!messageText) {
      throw new InvalidBody(['messageText'])
    }

    console.log(req.params.taskId)
    const taskId = req.params.taskId

    if (!taskId) {
      throw new InvalidParams(['taskId'])
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

// Worker, Clienter: Deletar meddalanden från ärenden
  const DeleteMessageById = (req, res, next) => {
    console.log('GetMessageById')
    res.json({message: 'Done'})
  }

module.exports = {
  PostMessageById,
  GetMessageById,
  DeleteMessageById
}