const mongoose = require('mongoose');

const expensesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expenses', expensesSchema);