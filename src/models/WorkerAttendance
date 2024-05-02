const mongoose = require('mongoose');

const workerAttendanceScheme = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    workerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timeStamps: true
});

module.exports = mongoose.model('WorkerAttendance', workerAttendanceScheme);