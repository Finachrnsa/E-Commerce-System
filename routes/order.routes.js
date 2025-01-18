const orderController = require('../controllers/order.controllers')

const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/admin-auth')

const express = require('express');
const router = express.Router();

// USER
router.get('/orders/:id', auth, orderController.getOrderById)
router.post('/orders', auth, orderController.postOrder)

// ADMIN
router.get('/orders', adminAuth, orderController.getAllOrder)
router.put('/orders/:id', adminAuth, orderController.updateOrder)
router.delete('/orders/:id', adminAuth, orderController.deleteOrderById)

module.exports = router