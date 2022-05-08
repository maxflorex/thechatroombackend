const router = require('express').Router();
const User = require('../models/User.js')
const Message = require('../models/Message')

// CREATING USER
router.post('/', async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        console.log(req.body)
        const user = await User.create({ name, email, password, picture })
        res.status(201).json(user);
    } catch (error) {
        let msg;
        if (error.code == 11000) {
            msg = 'User already exists'
        } else {
            msg = error.message;
        }
        console.log(error)
        res.status(400).json(msg)
    }
})

// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        user.status = 'Online';
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// CONTACT ME - THANK YOU
router.post('/contact', async (req, res) => {
    try {
        const { email, message } = req.body;
        console.log(req.body)
        const newMessage = await Message.create({ email, message })
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router