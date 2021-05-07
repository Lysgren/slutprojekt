const { Router } = require('express')
const router = Router()
const Auth = require('../middleware/Auth')
const { UserController, MessageController, TaskController, GeneralController } = require('../controllers/index')

// General endpoints
router.post('/authenticate', GeneralController.Authenticate) // Done
router.get('/me', Auth.Client, GeneralController.GetMe) // Done
router.patch('/me', Auth.Client, GeneralController.PatchMe) // Done
router.get('/users', UserController.GetUsers) // Ej tillgänglig för clients
router.get('/users/:id', UserController.SpecificUser)

// Admin Endpoints
router.post('/users', UserController.RegisterUser) // Done
router.patch('/users/:id', UserController.UpdateUser)
router.delete('/users/:id', UserController.DeleteUser)
router.delete('/tasks/:id', Auth.Admin, TaskController.DeleteTask)

// Worker Endpoints
router.post('/tasks', TaskController.CreateTask)
router.get('/tasks', TaskController.GetTasks)
router.get('/tasks/:id', TaskController.GetTaskById)
router.patch('/tasks/:id', TaskController.PatchTask)
// Endpoint is in Admin endpoints. router.delete('/users/:id')
router.get('/tasks/:id/messages', MessageController.GetMessageById)
router.post('/tasks/:id/messages', MessageController.PostMessageById)
router.delete('/tasks/:id/messages', MessageController.DeleteMessageById)
// To be fixed router.post('/tasks/:id/image')

// Client Endpoints
// Endpoint is in Worker endpoints. router.get('/tasks', TaskController.GetClientTasks)
// Endpoint is in Worker endpoints. router.get('/tasks/id', TaskController.GetTaskById)
// Endpoint is in Worker endpoints. router.get('/tasks/:id/messages', MessageController.GetMessageById)
// Endpoint is in Worker endpoints. router.post('/tasks/:id/messages', MessageController.PostMessageById)
// Endpoint is in Worker endpoints. router.delete('/tasks/:id/messages', MessageController.DeleteMessageById)

module.exports = router