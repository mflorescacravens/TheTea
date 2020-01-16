const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    text: {
        type: String
        // minlength: [1, 'comment must be be longer than character'],
        // maxlength: [1000, 'comment cannot be longer than 1000 characters']
    },
    like: {
        type: Boolean
    },
    emotion: {
        type: String
    }
})

module.exports = mongoose.model('Status', statusSchema);
