const mongoose = require('mongoose');

const chaffPriceScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sellingPrice: { type: Number, required: true },
    buyingPrice: { type: Number, required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timeStamps: true
});

module.exports = mongoose.model('ChaffPrice', chaffPriceScheme);