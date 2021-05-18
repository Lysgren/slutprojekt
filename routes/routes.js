const { Router } = require('express')
const router = Router()
const Auth = require('../middleware/Auth')
const parseQuery = require('../middleware/parseQuery')
const { UserController, MessageController, TaskController, GeneralController } = require('../controllers/index')

// General endpoints
router.post('/authenticate', GeneralController.Authenticate)
router.get('/me', Auth('CLIENT', 'WORKER', 'ADMIN'), GeneralController.GetMe)
router.patch('/me', Auth('CLIENT', 'WORKER', 'ADMIN'), GeneralController.PatchMe)
router.get('/users', Auth('WORKER', 'ADMIN'), parseQuery, UserController.GetUsers) // Ej tillgänglig för clients
router.get('/users/:id', Auth('ADMIN', 'WORKER', 'CLIENT'), UserController.SpecificUser)

// ADMIN Endpoints
router.post('/users', Auth('ADMIN'), UserController.RegisterUser)
router.patch('/users/:id', Auth('ADMIN'), UserController.UpdateUser)
router.delete('/users/:id', Auth('ADMIN'), UserController.DeleteUser)
router.delete('/tasks/:id', Auth('ADMIN'), TaskController.DeleteTask)

// WORKER Endpoints
router.post('/tasks',Auth('WORKER'), TaskController.CreateTask)
router.get('/tasks', Auth('ADMIN', 'WORKER', 'CLIENT'), parseQuery, TaskController.GetTasks)
router.get('/tasks/:id', Auth('ADMIN', 'WORKER', 'CLIENT'), TaskController.GetTaskById)
router.patch('/tasks/:id', Auth('WORKER'), TaskController.PatchTask)
router.post('/tasks/:id/images', Auth('ADMIN', 'WORKER'), TaskController.uploadImage)

router.get('/tasks/:taskId/messages', Auth('ADMIN', 'WORKER', 'CLIENT'), MessageController.GetMessageById)
router.post('/tasks/:taskId/messages', Auth('ADMIN', 'WORKER', 'CLIENT'), MessageController.PostMessageById)
router.delete('/messages/:msg_id', Auth('ADMIN', 'WORKER', 'CLIENT'), MessageController.DeleteMessageById)

// CLIENT Endpoints
// Endpoint is in WORKER endpoints. router.get('/tasks', TaskController.GetClientTasks)
// Endpoint is in WORKER endpoints. router.get('/tasks/id', TaskController.GetTaskById)
// Endpoint is in WORKER endpoints. router.get('/tasks/:id/messages', MessageController.GetMessageById)
// Endpoint is in WORKER endpoints. router.post('/tasks/:id/messages', MessageController.PostMessageById)
// Endpoint is in WORKER endpoints. router.delete('/tasks/:id/messages', MessageController.DeleteMessageById)

module.exports = router