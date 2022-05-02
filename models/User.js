const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Can not be blank']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Can not be blank'],
        index: true,
        validate: [isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Can not be blank']
    },
    picture: {
        type: String,
    },
    newMessage: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        dafault: 'Online'
    }
}, { minimize: false });


// USER VARIABLE
const User = mongoose.model('User', UserSchema)

mongoose.exports = User