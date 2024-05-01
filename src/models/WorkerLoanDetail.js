const { timeStamp } = require('console');
const mongoose = require('mongoose');

const workerLoanDetailScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    workerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    loanAmount: { type: Number, required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateDeducted: { type: Date},
    datePaid: { type: Date}
}, {
    timeStamps: true
});

module.exports = mongoose.model('WorkerLoanDetail', workerLoanDetailScheme);