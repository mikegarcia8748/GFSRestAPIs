const Customer = require('../models/Customer');
const mongoose = require('mongoose');

const get_customers = (req, res, next) => {
    Customer.find()
        .select('name alias')
        .exec()
        .then(doc => {
            if (doc.length !== 0) {
                res.status(200).json({
                    status: "success",
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
                res.status(200).json({
                    status: "error",
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
            status: "error",
            statusCode: "500",
            message: 'Please enter customer name.'
        });
    } else if(alias.trim() === "") {
        res.status(200).json({
            status: "error",
            statusCode: "500",
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
                    status: "success",
                    statusCode: "200",
                    message: 'New customer has been save!',
                    data: {
                        id: result._id,
                        name: name,
                        alias: alias  
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: "error",
                    statusCode: "500",
                    message: err.message
                });
            });
    }
};

const get_customer = (req, res, next) => {
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
};

const search_customer = (req, res, next) => {
    const customerName = req.params.customerName;

    Customer.find({ name: { $regex: customerName, $options: 'i'} })
        .exec()
        .then(result => {
            if (result.length == 0) {
                return res.status(200).json({
                    status: 'error',
                    statusCode: 404,
                    message: "No Record Found!"
                });
            }

            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: "Customer found",
                data: result.map(customer => {
                    return { 
                        id: customer.id,
                        name: customer.name,
                        alias: customer.alias
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                statusCode: 500,
                message: err.message, 
            });
        });
};

const update_customer =  (req, res, next) => {
    res.status(200).json({
        message: 'Updated customer!'
    });
};

const deactivate_customer = (req, res, next) => {
    // const id = req.params.customerID
    // Customer.deleteOne({_id: id}, (err) => {
    //     if (err) {
    //         res.status(200).json({
    //             message: 'Customer deleted!'
    //         });
    //     } else {
    //         res.status(500).json({
    //             message: err.message
    //         })
    //     }
    // });
};

module.exports = {
    get_customers,
    add_customer,
    search_customer,
    get_customer,
    update_customer,
    deactivate_customer
};