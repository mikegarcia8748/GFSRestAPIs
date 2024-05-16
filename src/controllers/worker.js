const mongoose = require('mongoose');

const user = require('../models/User')

const addWorker = (req, res, next) => {
    const worker = new user({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        userName: req.body.userName,
        userPIN: '000000',
        accountType: 1
    });

    worker.save()
        .then(result => {
            res.status(200).json({
                status: "success",
                statusCode: "201",
                message: "A new employee was added!"
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

const getWorkers = (req, res, next) => {
    user.find({ isActivated: true, accountType: 1 })
        .select('fullName userName')
        .exec()
        .then(result => {
            if (result.length === 0) {
                return res.status(200).json({
                    status: "error",
                    statusCode: "404",
                    message: "No employees found!"
                })
            }

            res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "Employee retrieved successfully!",
                data: result
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

const updateWorkerDetail = (req, res, next) => {
    res.status(200).json({
        message: 'Updated worker!'
    });
};

const deactivateWorker = (req, res, next) => {
    res.status(200).json({
        message: 'Deleted workersssssss!'
    });
};

module.exports = {
    addWorker,
    getWorkers,
    updateWorkerDetail,
    deactivateWorker
}