var mongoose = require('mongoose');

module.exports = mongoose.model('profiles', {
    userId: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
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