const { stat } = require('fs');
const Chaffprice = require('../models/ChaffPrice');
const chaffprice = require('../models/ChaffPrice');
const mongoose = require('mongoose');

const add_price = (req, res, next) => {
    const chaffprice = new Chaffprice({
        _id: new mongoose.Types.ObjectId(),
        sellingPrice: req.body.sellingPrice,
        buyingPrice: req.body.buyingPrice,
        entryBy: req.body.entryBy
    })
    chaffprice.save()
        .then(result => {
            res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "New chaff price added!",
                data: {
                    id: result._id,
                    sellingPrice: result.sellingPrice,
                    buyingPrice: result.buyingPrice,
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
        })
};

const get_chaff_price = (req, res, next) => {
    Chaffprice.find({})
        .sort({createdAt: -1})
        .limit(1)
        .exec()
        .then(result => {
            if (result.lenght === 0) {
                return res.status(200).json({
                    status: "error",
                    statusCode: "404",
                    message: "No mill service price was found"
                })
            }
            
            res.status(200).json({
                status: "success",
                statusCode: "200",
                message: "Chaff price has been retrieved!",
                data: result.map(price => {
                    return {
                        id: price._id,
                        sellingPrice: price.sellingPrice,
                        buyingPrice: price.buyingPrice,
                        entryBy: price.entryBy
                    }
                })
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
    add_price,
    get_chaff_price
}