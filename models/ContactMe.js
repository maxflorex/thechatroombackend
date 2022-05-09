const mongoose = require('mongoose')

const MailSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
    },
    message: {
        type: String,
        required: true,
    }
})

// USER VARIABLE SIMPLIFY
const Mail = mongoose.model('Mail', MailSchema)

module.exports = Mail