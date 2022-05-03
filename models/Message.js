const mongoose = require('mongoose')
const MessageChema = new mongoose.Schema({
    content: String,
    from: Object,
    socketid: String,
    time: String,
    data: String,
    to: String,
})

const Message = mongoose.model('Message', MessageChema)

module.exports = Message