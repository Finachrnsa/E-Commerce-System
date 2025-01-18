const db = require('../config/db')

const getAllProduct = async () => {
    const [result] = await db.query('SELECT * FROM products')
    return result
}

const getProductById = async (id) => {
    const [result] = await db.query('SELECT * FROM products WHERE id=?', id)
    return result
}

const deleteProductById = async (id) => {
    const [result] = await db.query("DELETE FROM products WHERE id=?", [id]);
    return result.affectedRows;
}

const postProduct = async (data) => {
    const { title, price, description } = data

    if (!title || !price || !description) {
        console.log('Data tidak lengkap:', {title, price, description});
        return ({ msg: 'Data tidak lengkap' })
    }

    try {
        const [result] = await db.query(
            'INSERT INTO products (title, price, description) VALUES (?, ?, ?)',
            [title, price, description]
        )
        
        return ({ result })

    } catch (eror) {
        console.log(eror);
    }
}

const updateProduct = async (id, title, price, description) => {
    console.log('data', id, title, price, description)
    
    const query = 'UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?'

    try {
        const [result] = await db.execute(query, [title, price, description, id])
        console.log('data result', result)
        
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllProduct,
    getProductById,
    deleteProductById,
    postProduct,
    updateProduct
}