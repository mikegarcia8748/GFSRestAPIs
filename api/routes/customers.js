const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const mongoose = require('mongoose');
const customer = require('../models/customer');

router.get('/', (req, res, next) => {
    Customer.find()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Customers successfully retrieve.',
                    data: doc
                });
            } else {
                res.status(404).json({
                    message: 'No Record Found!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
})

router.post('/', (req, res, next) => {
    // const customer = {
    //     name: req.body.name,
    //     alias: req.body.alias
    // }
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        alias: req.body.alias
    })
    customer.save()
        .then(result => {
            res.status(200).json({
                message: 'New customer has been save!'
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
})

router.get('/:customerID', (req, res, next) => {
    const id = req.params.customerID;
    Customer.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No Record Found!"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.patch('/:customerID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated customer!'
    });
})

router.delete('/:customerID', (req, res, next) => {
    const id = req.params.customerID
    Customer.deleteOne({_id: id}, (err) => {
        if (err) {
            res.status(200).json({
                message: 'Customer deleted!'
            });
        } else {
            res.status(500).json({
                message: err.message
            })
        }
    });
})

module.exports = router;