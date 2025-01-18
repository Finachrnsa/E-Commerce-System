const cartController = require('../controllers/carts.controller')

const auth = require('../middlewares/auth')
// const adminAuth = require('../middlewares/admin-auth')

const express = require('express');
const router = express.Router();

// USER
router.get('/carts', auth, cartController.getCart)
router.get('/carts/users/:id', auth, cartController.getCartById)
router.delete('/carts/:id', auth, cartController.deleteCartById)
router.post('/carts', auth, cartController.postCart)
router.put('/carts/:id', auth, cartController.updateCart)

module.exports = router