const productModel = require('../models/product.models')

const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.getAllProduct()

        if (!products) {
            return res.status(400).json({ message: 'Products not found' })
        }

        return res.status(200).send({ products })
    } catch (error) {
        return res.status(400).send({ message: error })
    }
}

const getProductById = async (req, res) => {

    try {
        const product = await productModel.getProductById(req.params.id)
        if (product.length > 0) {
            res.status(200).json({ product })
        }

        else {
            res.status(500).json({ message: 'Product Not Found' })
        }
    }

    catch (error) {
        res.status(500).json({ message: 'Error Get Product' })
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCount = await productModel.deleteProductById(id)
        if (deletedCount > 0) {
            res.status(200).json({ message: "Product deleted successfully" })
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const postProduct = async (req, res) => {
    const data = req.body

    try {
        const add = await productModel.postProduct(data)
        if (add) {
            return res.status(200).json({
                id: add.id,
                title: data.title,
                price: data.price,
                description: data.description
            })
        }

        return res.status(400).send({ msg: 'Post product Failed' })
    } catch (eror) {
        console.log(eror);
    }
}

const updateProduct = async (req, res) => {
    console.log('id', req.params)
    console.log('data', req.body)
    
    const { id } = req.params
    const { title, price, description } = req.body

    if (!title || !price || !description) {
        return res.status(400).json({ message: 'product is required' })
    }

    try {
        const result = await productModel.updateProduct(id, title, price, description)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product update sukses' })
    } catch (error) {
        console.log({ message: error.message })
        
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllProduct,
    getProductById,
    deleteProductById,
    postProduct,
    updateProduct
}