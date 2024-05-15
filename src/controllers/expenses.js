const mongoose = require('mongoose');

const Expenses = require('../models/Expenses');

const addExpenses = (req, res, next) => {

    const expenses = new Expenses({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        amount: req.body.amount,
        entryBy: req.body.entryBy
    })

    expenses.save()
        .then(result => {
            res.status(200).json({
                status: "success",
                statusCode: "201",
                message: "New expenses has been filed!"
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

const getExpenses = (req, res, next) => {
    Expenses.find()
        .select('description amount')
        .then(result => {
            if (result.length === 0) {
                return res.status(200).json({
                    status: "error",
                    statusCode: "404",
                    message: "No expenses found!"
                })
            }

            return res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "Weekly expenses has been retrieved!",
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

module.exports = {
    addExpenses,
    getExpenses
}