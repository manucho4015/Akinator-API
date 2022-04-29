const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('Please start a game!', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { id } = payload
        req.akinator_id = { id }
        next()
    } catch (error) {
        throw new CustomAPIError('Invalid Akinator. Start new game!', 401)
    }

}


module.exports = authenticationMiddleware