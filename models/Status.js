const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    text: {
        type: String,
        // minlength: [1, 'comment must be be longer than character'],
        maxlength: [4000, 'comment cannot be longer than 4000 characters']
    },
    like: {
        type: Boolean
    },
    emotion: {
        type: String
    },
    date: {
        type: String
    }
})

module.exports = mongoose.model('Status', statusSchema);
