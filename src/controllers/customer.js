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

module.exports = {
    get_customers
};