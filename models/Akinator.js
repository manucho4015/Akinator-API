const mongoose = require('mongoose')
require('mongoose-function')(mongoose)
const { Aki } = require('aki-api');

const AkinatorSchema = new mongoose.Schema({
    akinator: [{
        currentStep: String,
        region: String,
        uri: String,
        urlApiWs: String,
        noUri: String,
        noSession: String,
        progress: Number,
        guessCount: Number,
        childMode: [{ childMod: Boolean, softConstraint: String, questionFilter: String }],
        question: String,
        answers: []
    }],

})

module.exports = mongoose.model('Akinator', AkinatorSchema)