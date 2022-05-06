const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Can not be blank'],
        index: true,
        validate: [isEmail, 'Invalid email']
    },
    message: {
        type: String,
        required: [true, 'Can not be blank']
    }
})

// USER VARIABLE SIMPLIFY
const ContactMe = mongoose.model('Contact', ContactSchema)

module.exports = ContactMe