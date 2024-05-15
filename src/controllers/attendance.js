const mongoose = require('mongoose');
const Attendance = require('../models/WorkerAttendance');

const timeInAttendance = (req, res, next) => {
    
    const attendance = new Attendance({
        _id: new mongoose.Types.ObjectId(),
        workerID: req.params.workerID
    });

    attendance.save()
        .then(result => {
            res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "Worker is tagged as present!"
            })
        })
        .catch(error => {
            res.status(200).json({
                status: "error",
                statusCode: "500",
                message: error.message
            })
        })
};

const getAttendance = (req, res, next) => {
    const workerID = req.params.workerID;

    Attendance.findById(workerID)
        .exec()
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    status: "error",
                    statusCode: "404",
                    message: "No attendance found!"
                })
            }
            if (result.length === 0) {
                return res.status(200).json({
                    status: "error",
                    statusCode: "404",
                    message: "No attendance found!"
                })
            }

            return res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "Attendance retrieved!",
                data: result.map(docs => {
                    return {
                        date: docs.createdAt
                    } 
                })
            })
        })
};

module.exports = {
    timeInAttendance,
    getAttendance
}