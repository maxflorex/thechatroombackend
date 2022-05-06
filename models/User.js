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
    newMessages: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        dafault: 'Online'
    }
}, { minimize: false });


// HASH PASSWORD
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (error, salt) {
        if (error) return next(error);

        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) return next(error);

            user.password = hash
            next()
        })
    })
})


UserSchema.method.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;

}


// FIND CREDENTIALS - MATCH
UserSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');
    return user
}


// USER VARIABLE SIMPLIFY
const User = mongoose.model('User', UserSchema)

module.exports = User