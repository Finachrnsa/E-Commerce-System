const db = require('../config/db')

const getCart = async () => {
    const [result] = await db.query('SELECT * FROM cart ')
    return result
}

const getCartById = async (id) => {
    const [result] = await db.query('SELECT * FROM cart WHERE id=?', id)
    return result
}

const getCartByUserId = async (id) => {
    const [result] = await db.query('SELECT * FROM cart WHERE user_id=?', id)
    return result
}

const deleteCartById = async (id) => {
    const [result] = await db.query("DELETE FROM cart WHERE id=?", [id]);
    return result.affectedRows;
}

const postCart = async (data) => {
    const { user_id, product_id, quantity } = data

    if (!user_id || !product_id || !quantity) {
        console.log('Data tidak lengkap:', {user_id, product_id, quantity});
        return ({ msg: 'Data tidak lengkap' })
    }

    try {
        const [result] = await db.query(
            'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [user_id, product_id, quantity]
        )
        
        return ({ result })

    } catch (eror) {
        console.log(eror);
    }
}

const updateCart = async (id, quantity) => {

    try {
        const [result] = await db.execute(
            'UPDATE cart SET quantity = ? WHERE id = ?',
            [quantity, id]
        )

        console.log('data result', result)
        
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCart,
    getCartById,
    getCartByUserId,
    deleteCartById,
    postCart,
    updateCart
}