const MillServicePrice = require('../models/MillServicePrice');
const mongoose = require('mongoose');

const getMillPrice = (req, res, next) => { 
    MillServicePrice.find({})
        .sort({createdAt: 1})
        .limit(1)
        .exec()
        .then(result => {
            if (result.lenght == 0) {
                return res.status(200).json({
                    status: "error",
                    statusCode: "404",
                    message: "No mill service price was found"
                })
            }

            res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "Mill service price has been fetched",
                data: result.map(price => {
                    return {
                        id: price._id,
                        price: price.millingPrice,
                        entryBy: price.entryBy
                    }
                })
            })
        })
        .catch(error => {
            res.status(200).json({
                status: "success",
                statusCode: "500",
                message: error.message
            })
        });
};

const addNewPrice = (req, res, next) => {
    const millPrice = new MillServicePrice({
        _id: new mongoose.Types.ObjectId(),
        millingPrice: req.body.price,
        entryBy: req.body.entryBy
    })
    millPrice.save()
        .then(result => {
            res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "New milling service price added!",
                data: {
                    id: result._id,
                    price: result.millingPrice,
                    entryBy: result.entryBy
                }
            })
        })
        .catch(error => {
            res.status(200).json({
                status: "error",
                statusCode: "500",
                message: error.message
            })
        });
};

module.exports = {
    getMillPrice,
    addNewPrice
}