const express = require('express')
const router = express.Router()

const { startSession, playGame, editConfig } = require('../controllers/akinator')
const authenticateAkinator = require('../middleware/auth')

router.route('/start').post(startSession)
router.route('/test').post(editConfig)
router.route('/play').patch(authenticateAkinator, playGame)

module.exports = router