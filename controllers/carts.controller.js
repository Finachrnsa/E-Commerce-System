const cartModel = require('../models/carts.models')
const userModel = require('../models/user.models')
const productModel = require('../models/product.models')

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.getCart()

        if (!cart) {
            return res.status(400).json({ message: 'Carts not found' })
        }

        return res.status(200).send({ cart })
    } catch (error) {
        return res.status(400).send({ message: error })
    }
}

const getCartById = async (req, res) => {

    try {
        const user = await userModel.getUserById(req.params.id)

        const cart = await cartModel.getCartByUserId(req.params.id)

        if (cart.length > 0) {

            res.status(200).json({
                user,
                cart: cart
                    .filter(cart => cart.id)
                    .map(cart => ({
                        cart
                    }))
            })
        }

        else {
            res.status(500).json({ message: 'Product Not Found' })
        }
    }

    catch (error) {
        res.status(500).json({ message: 'Error Get Product' })
    }
}

const deleteCartById = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCount = await cartModel.deleteCartById(id)
        if (deletedCount > 0) {
            res.status(200).json({ message: "Cart deleted successfully" })
        } else {
            res.status(404).json({ message: "Cart not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const postCart = async (req, res) => {
    const data = req.body

    try {
        const add = await cartModel.postCart(data)
        if (add) {
            return res.status(200).json({
                id: add.id,
                user_id: data.user_id,
                product_id: data.product_id,
                quantity: data.quantity
            })
        }

        return res.status(400).send({ message: 'Post cart Failed' })
    } catch (eror) {
        console.log(eror);
    }
}

const updateCart = async (req, res) => {
    console.log('id', req.params)
    console.log('data', req.body)
    
    const { id } = req.params
    const { quantity } = req.body

    if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' })
    }

    try {
        const result = await cartModel.updateCart(id, quantity)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        res.status(200).json({ message: 'Cart update sukses' })
    } catch (error) {
        console.log({ message: error.message })
        
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getCart,
    getCartById,
    deleteCartById,
    postCart,
    updateCart
}