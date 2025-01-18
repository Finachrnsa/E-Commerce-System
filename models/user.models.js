const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegistration = async (data) => {
    const { name, email, password } = data

    if (!name || !email || !password) {
        return { message: 'name, email and password is required' }
    }

    try {
        const [user] = await db.query(
            'SELECT * FROM users WHERE name = ?',
            [name]
        )

        if (user && user.length > 0) {
            return { message: 'user name sudah ada yang memakai' }
        }

        const salt = 10
        const hash = await bcrypt.hash(password, salt)

        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hash]
        )

        return ({ 
            id: result.insertId,
            user_name: name,
            email: email,
            pass: hash
        })

    } catch (eror) {
        console.log(eror);
    }
}

const userLogin = async (data) => {
    const { name, password } = data

    if (!name || !password) {
        return { message: 'user name and password is required' }
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM users WHERE name = ?',
            [name]
        )

        if (result.length === 0) {
            return { message: 'invalid user name' }
        }

        const user = result[0]

        const isLogin = await bcrypt.compare(password, user.password)

        if (isLogin) {
            const payload = {
                id: user.id,
                user_name: user.name,
                email: user.email
            }

            const userToken = jwt.sign(payload, process.env.USER_JWT_SECRET, {expiresIn: '1h'})

            return {
                id: user.id,
                user_name: user.name,
                email: user.email,
                user_token: userToken
            }

        } else {
            return { message: 'Invalid password' }
        }

    } catch (error) {
        return { message: error }
    }
}

const getAllUser = async () => {
    const [result] = await db.query('SELECT * FROM users')
    return result
}

const getUserById = async (id) => {
    const [result] = await db.query('SELECT * FROM users WHERE id=?', id)
    return result
}

const deleteUserById = async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
    return result.affectedRows;
}

module.exports = {
    userRegistration,
    userLogin,
    getAllUser,
    getUserById,
    deleteUserById
}