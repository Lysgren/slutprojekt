const { Router } = require('express')
const router = Router()
const Auth = require('../middleware/Auth')
const { AdminController, GeneralController } = require('../controllers/index')

// General endpoints
router.post('/authenticate', GeneralController.Authenticate)
router.get('/me',  GeneralController.GetMe)
router.patch('/me',  GeneralController.PatchMe)
router.get('/users',  GeneralController.Users)
router.get('/users/:id', GeneralController.SpecificUser)

// Admin Endpoints
router.post('/users', AdminController.RegisterUser)
router.patch('/users/:id', AdminController.UpdateUser)
router.delete('/users/:id', AdminController.DeleteUser)
router.delete('/tasks/:id', AdminController.DeleteTask)

// Worker Endpoints

// Client Endpoints

module.exports = router