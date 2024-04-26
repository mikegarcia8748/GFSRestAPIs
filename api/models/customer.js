const mongoose = require('mongoose');

const customerScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    alias: String
});

module.exports = mongoose.model('Customer', customerScheme)