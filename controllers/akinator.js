require('dotenv').config()
const { Aki } = require('aki-api')
const { StatusCodes } = require('http-status-codes')
const Akinator = require('../models/Akinator');
const jwt = require('jsonwebtoken')

let akinators = {}

const startSession = async (req, res) => {
    const { region: region } = req.body;
    const aki = new Aki({ region });

    aki.start()

    const akinator = await Akinator.create({ akinator: aki })
    const id = akinator._id
    const token = jwt.sign({ id, region }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })

    akinators[id] = aki

    res.status(StatusCodes.CREATED).json({ success: true, token, akinators })

}


const playGame = async (req, res) => {
    const { answer: answer } = req.body
    const { id } = req.akinator_id

    try {
        const aki = akinators[id]

        await aki.step(answer)

        if (aki.progress >= 75 || aki.currentStep >= 79) {
            await aki.win()
            console.log('first Guess: ', aki.answers)
            console.log('Guess Count: ', aki.guessCount)
            delete akinators[id]
            return res.status(200).json({ success: true, "first guess": aki.answers, "guess count": aki.guessCount })

        }
        res.status(200).json({ success: false, question: aki.question, progress: aki.progress })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }

}

const editConfig = async (req, res) => {
    const { variable1 } = req.body
    process.env.VARIABLE = variable1

    res.status(StatusCodes.OK).json({ variable: process.env.VARIABLE })
}


module.exports = {
    startSession,
    playGame,
    editConfig
}