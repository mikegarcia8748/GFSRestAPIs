const express = require('express');
const router = express.Router();
const mongoos = require('mongoose');
const MillTransaction = require('../models/MIllTransaction');
const MillPayment = require('../models/MillPayment')
const CustomerBalance = require('../models/CustomerBalance')
const Customer = require('../models/Customer')
const User = require('../models/User')

//Create Transaction and Payment...
router.post('/', (req, res, next) => {
    const customerID = req.body.customerID;
    const entryBy = req.body.entryBy;
    const riceWeight = req.body.riceWeight;
    const sixtyKgs = req.body.sixtyKgs;
    const fiftyKgs = req.body.fiftyKgs;
    const thirtyKgs = req.body.thirtyKgs;
    const twentyFiveKgs = req.body.twentyFiveKgs;
    const chaffWeight = req.body.chaffWeight;
    const millPrice = req.body.millPrice;
    const chaffPrice = req.body.chaffPrice;
    const subTotal = req.body.subTotal;
    const deductions = req.body.deductions;
    const amountPaid = req.body.amountPaid;
    const balance = req.body.balance;
    
    const millTransaction = new MillTransaction({
        customerID: customerID,
        entryBy: entryBy,
        riceWeight: riceWeight,
        sixtyKgs: sixtyKgs,
        fiftyKgs, fiftyKgs,
        thirtyKgs: thirtyKgs,
        twentyFiveKgs: twentyFiveKgs,
        chaffWeight: chaffWeight
    });

    millTransaction
        .save()
        .then(result => {
            const millPayment = new MillPayment({
                referenceID: result._id,
                millPrice: millPayment,
                chaffPrice: chaffPrice,
                subTotal: subTotal,
                deductions: deductions,
                amountPaid: amountPaid,
                balance: balance
            });

            millPayment
                .save()
                .then(result => {
                    return res.status(201).json({
                        message: 'Transaction successfully save.',
                        referenceID: result._id
                    })
                })
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});