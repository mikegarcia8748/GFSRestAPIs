const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fulName: { type: String, required: true },
    userName: { type: String, required: true },
    userPIN: { type: Number, required: true, maxLength: 6 },
    accountType: { type: String, required: true,  maxLength: 1 }
}, {
    timeStamps: true,
});

module.exports = mongoose.model('User', userScheme);