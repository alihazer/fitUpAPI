const mongoose = require('mongoose');

const emailVerificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 21600, // 6 hours
        default: Date.now
    }
});

