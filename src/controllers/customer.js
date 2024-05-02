const Customer = require('../models/customer');
const mongoose = require('mongoose');

const get_customers = (req, res, next) => {
    Customer.find()
        .select('name alias')
        .exec()
        .then(doc => {
            if (doc.length !== 0) {
                res.status(200).json({
                    statusCode: "200",
                    message: 'Customers successfully retrieve.',
                    data: doc.map(doc => {
                        return { 
                            id: doc.id,
                            name: doc.name,
                            alias: doc.alias
                        }
                    })
                });
            } else {
                res.status(404).json({
                    statusCode: "404",
                    message: 'No Record Found!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                statusCode: "500",
                message: err.message
            });
        });
};

const add_customer = (req, res, next) => {
    
    const name = req.body.name;
    const alias = req.body.alias;

    // Validate User Entry...
    if (name.trim() === "") {
        res.status(200).json({
            statusCode: "200",
            message: 'Please enter customer name.'
        });
    } else if(alias.trim() === "") {
        res.status(200).json({
            statusCode: "200",
            message: 'Please enter customer alias.'
        });
    } else {

        const customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            alias: req.body.alias
        });
    
        customer.save()
            .then(result => {
                res.status(200).json({
                    statusCode: "200",
                    message: 'New customer has been save!',
                    id: result._id
                });
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: "500",
                    message: err.message
                });
            });
    }
};

module.exports = {
    get_customers,
    add_customer
};