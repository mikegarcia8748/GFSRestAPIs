const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const customerController = require('../controllers/customer')

// Get List of Customers
router.get('/', checkAuth, customerController.get_customers);

// Add Customer
router.post('/', checkAuth, customerController.add_customer);

router.get('/:customerID', customerController.get_customer);

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