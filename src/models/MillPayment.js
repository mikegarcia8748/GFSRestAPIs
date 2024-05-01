const { timeStamp } = require('console');
const mongoose = require('mongoose');

const millPaymentScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    referenceID: { type: mongoose.Schema.Types.ObjectId, ref: 'MillTransaction' },
    millPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'MillServicePrice' },
    chaffPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'ChaffPrice' },
    subTotal: { type: Number, required: true },
    deductions: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    balance: { type: Number, required: true }
}, {
    timeStamps: true
})

module.exports = mongoose.model('MillPayment', millPaymentScheme);