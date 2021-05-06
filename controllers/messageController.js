const Message = require('../models/Message')

// Worker, Clienter: Hämtar meddalanden från ärenden
const GetMessageById = (req, res, next) => {
    console.log('GetMessageById')
    res.json({message: 'Done'})
  }
// Worker, Clienter: Postar meddalanden från ärenden
  const PostMessageById = async (req, res, next) => {
    const { messageText, from, to } = req.body
    const { taskId } = req.params.taskId

    const message = new Message({
      message: messageText,
      from,
      to,
      task: taskId
    })

    await message.save()
    res.json({message})
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