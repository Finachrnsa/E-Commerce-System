const productController = require('../controllers/product.controller')

const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/admin-auth')

const express = require('express');
const router = express.Router();

// USER
router.get('/products', auth, productController.getAllProduct)
router.get('/products/:id', auth, productController.getProductById)

// ADMIN
router.delete('/products/:id', adminAuth, productController.deleteProductById)
router.post('/products', adminAuth, productController.postProduct)
router.put('/products/:id', adminAuth, productController.updateProduct)

module.exports = router