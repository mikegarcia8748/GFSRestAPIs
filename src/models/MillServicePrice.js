const { timeStamp } = require('console');
const mongoose = require('mongoose')

const millServicePriceScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    millingPrice: { type: Number, required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

module.exports = mongoose.model('MillServicePrice', millServicePriceScheme)