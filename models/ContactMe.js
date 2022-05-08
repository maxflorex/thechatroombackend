const mongoose = require('mongoose')

const MailSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Can not be blank'],
        index: true,
    },
    message: {
        type: String,
        required: [true, 'Can not be blank']
    }
})

// USER VARIABLE SIMPLIFY
const Mail = mongoose.model('Mail', MailSchema)

module.exports = Mail