const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const customerController = require('../controllers/customer')

// Get List of Customers
router.get('/', checkAuth, customerController.get_customers);

// Add Customer
router.post('/', (req, res, next) => {
    
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