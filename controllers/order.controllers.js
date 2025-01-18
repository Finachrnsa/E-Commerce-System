const orderModel = require('../models/order.models')

const getAllOrder = async (req, res) => {

    try {
        const order = await orderModel.getAllOrder()

        res.status(200).json({ order })
    }

    catch (error) {
        res.status(500).json({ message: 'Error Get Order' })
    }
}

const getOrderById = async (req, res) => {

    try {
        const order = await orderModel.getOrderById(req.params.id)

        if (order.length > 0) {

            res.status(200).json({ order })
        }

        else {
            res.status(500).json({ message: 'Order Not Found' })
        }
    }

    catch (error) {
        res.status(500).json({ message: 'Error Get Order' })
    }
}

const deleteOrderById = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCount = await orderModel.deleteOrderById(id)
        if (deletedCount > 0) {
            res.status(200).json({ message: "Order deleted successfully" })
        } else {
            res.status(404).json({ message: "Order not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const postOrder = async (req, res) => {
    const data = req.body

    try {
        const add = await orderModel.postOrder(data)
        if (add) {
            return res.status(200).json({
                id: add.id,
                user_id: data.user_id,
                total_price: data.total_price,
                status: data.status
            })
        }

        return res.status(400).send({ message: 'Post order Failed' })
    } catch (eror) {
        console.log(eror);
    }
}

const updateOrder = async (req, res) => {
    console.log('id', req.params)
    console.log('data', req.body)
    
    const { id } = req.params
    const { status } = req.body

    if (!status) {
        return res.status(400).json({ message: 'Status order is required' })
    }

    try {
        console.log('sebelum result update order')
        const result = await orderModel.updateOrder(id, status)
        console.log('sesudah', result)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Status order not found' })
        }

        res.status(200).json({ message: 'Order update sukses' })
    } catch (error) {
        console.log({ message: error.message })
        
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    deleteOrderById,
    postOrder,
    updateOrder
}