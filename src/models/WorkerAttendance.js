const mongoose = require('mongoose');

const workerAttendanceScheme = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    workerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entryBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    datePresent: { type: String, require: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('WorkerAttendance', workerAttendanceScheme);