const express = require('express')
const router = express.Router()
const demoCon = require('../controller/demoCon.js')
const serviceController = require('../controller/admin/ServiceController.js')
const CareerController = require('../controller/admin/CareerController.js')
const UserController = require('../controller/client/UserController.js')
const AuthMiddleware = require('../middleware/Authmiddilware.js')

// Admin Api
router.post('/createService', serviceController.CreateService)
router.delete('/deleteService/:serviceId', serviceController.deleteService)
router.post('/createCareer', CareerController.CreateCareer)
router.delete('/deleteCareer/:CareerID', CareerController.deleteCareer)

router.delete('/DeleteUser/:id', UserController.deleteUser)
router.get('/Allusers', UserController.getAllUsers)





// ----client api
router.get('/getAllService', serviceController.getAllService)
router.get('/getServiceById/:serviceId', serviceController.getServiceById)
router.get('/getAllCareer', CareerController.getAllCareer)
router.get('/getSingleCareer/:CareerID', CareerController.getSingleCareer)
// user Authorization
router.post('/CreateUser', UserController.CreateUser)
router.post('/EmailVerify/:email/:otp', UserController.EmailVerify)
router.post('/login', UserController.login)
router.get('/getProfile',AuthMiddleware, UserController.getProfile)
router.put('/UpdateUser/:id', UserController.updateUser)
router.delete('/DeleteUser/:id', UserController.deleteUser)







module.exports = router