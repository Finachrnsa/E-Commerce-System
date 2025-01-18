const db = require('../config/db')

const getAllOrder = async () => {
    const [result] = await db.query('SELECT * FROM orders')
    return result
}

const getOrderById = async (id) => {
    const [result] = await db.query('SELECT * FROM orders WHERE id=?', id)
    return result
}

const deleteOrderById = async (id) => {
    const [result] = await db.query("DELETE FROM orders WHERE id=?", [id]);
    return result.affectedRows;
}

const postOrder = async (data) => {
    const { user_id, total_price, status } = data

    if (!user_id || !total_price || !status) {
        console.log('Data tidak lengkap:', {user_id, total_price, status});
        return ({ msg: 'Data tidak lengkap' })
    }

    try {
        const [result] = await db.query(
            'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
            [user_id, total_price, status]
        )
        
        return ({ result })

    } catch (eror) {
        console.log(eror);
    }
}

const updateOrder = async (id, status) => {

    try {
        const [result] = await db.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        )

        console.log('data result', result)
        
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    deleteOrderById,
    postOrder,
    updateOrder
}