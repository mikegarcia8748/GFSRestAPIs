const mongoose = require('mongoose');

const dailyExpenseDetailScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    expense: { type: String, required: true },
    amount: { type: Number, required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

module.exports = mongoose.model('DailyExpenseDetail', dailyExpenseDetailScheme);