var mongoose = require('mongoose');

module.exports = mongoose.model('accounts', {
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    salt: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    }
});