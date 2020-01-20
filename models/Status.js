const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    text: {
        type: String,
        minlength: [1, 'comment must be be longer than character'],
        maxlength: [4000, 'comment cannot be longer than 4000 characters']
    },
    emotion: {
        type: String
    },
    date: {
        type: String
    },
    picture: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Status', statusSchema);
