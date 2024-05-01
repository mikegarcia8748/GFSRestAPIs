const mongoose = require('mongoose');

const millTransactionScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    riceWeight: { type: Number, default: 0 },
    sixtyKgs: { type: Number, default: 0 },
    fiftyKgs: { type: Number, default: 0 },
    thirtyKgs: { type: Number, default: 0 },
    twentyFiveKgs: { type: Number, default: 0 },
    chaffWeight: { type: Number, default: 0 }
}, {
    timeStamps: true
});

module.exports = mongoose.model('MillTransaction', millTransactionScheme);