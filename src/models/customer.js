const mongoose = require('mongoose');

const customerScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    alias: { type: String, required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});
customerScheme.index({name: 'text', 'name': 'text'});
module.exports = mongoose.model('Customer', customerScheme)