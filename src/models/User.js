const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    userPIN: { 
        type: String, 
        required: true,
        unique: true
     },
    accountType: { 
        type: String, 
        required: true,  
        maxLength: 1 
    },
    isActivated: {
        type: Boolean,
        default: true
    }
}, {
    timeStamps: true,
});

module.exports = mongoose.model('User', userScheme);