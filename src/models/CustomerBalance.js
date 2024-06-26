const mongoose = required('mongoose');

const customerBalanceScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID, 
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    remarks: { type: String, required: true },
    amount: { type: Number, required: true },
    datePaid: { type: Date },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timeStamps: true
});

module.exports = mongoose.model('CustomerBalance', customerBalanceScheme);