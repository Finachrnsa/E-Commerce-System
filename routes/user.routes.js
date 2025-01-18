const userController = require('../controllers/user.controller')

const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/admin-auth')

const express = require('express');
const router = express.Router();

// USER
router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
router.get('/users/:id', auth, userController.getUserById)

// ADMIN
router.delete('/users/:id', adminAuth, userController.deleteUserById)
router.get('/users/', adminAuth, userController.getAllUser)

module.exports = router