const mongoose = require('mongoose');
const Attendance = require('../models/WorkerAttendance');
const User = require('../models/User');
const date = require('../helper/DateUtils');
const { json } = require('body-parser');

const timeInAttendance = (req, res, next) => {
    
    const currentDate = date.getCurrentDate();

    const attendance = new Attendance({
        _id: new mongoose.Types.ObjectId(),
        workerID: req.body.workerID,
        entryBy: req.body.entryBy,
        datePresent: currentDate
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

    Attendance.find({workerID: workerID})
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
                        date: docs.createdAt,
                        entryBy: docs.entryBy
                    } 
                })
            })
        })
};

const getTodaysAttendance = async (req, res, next) => {
    try{
        const user = await User.find({isActivated: true, accountType: 1}).exec();

        const result = await Promise.all(user.map(async (user) => {
            
            const currentDate = date.getCurrentDate();
            const present = await Attendance.findOne({workerID: user._id, datePresent: currentDate}).exec();

            return {
                fullName: user.fullName,
                userName: user.userName,
                isPresent: present !== null
            }
        }));
        
        res.status(200).json({
            status: "success",
            statusCode: "200",
            message: "Attendance retrieved successfully!",
            data: result
        })
    } catch (error) {
        res.status(200).json({
            status: "error",
                statusCode: "500",
                message: error.message
        })
    }
}

module.exports = {
    timeInAttendance,
    getAttendance,
    getTodaysAttendance
}