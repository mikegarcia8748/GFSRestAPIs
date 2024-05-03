const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const customerController = require('../controllers/customer')

// Get List of Customers
router.get('/', checkAuth, customerController.get_customers);

// Add Customer
router.post('/', checkAuth, customerController.add_customer);

// Get Customer Info
router.get('/:customerID', customerController.get_customer);

// Update Customer Details/Status...
router.patch('/:customerID', customerController.update_customer);

// Deactivate Customer Information...
router.patch('/:customerID', customerController.deactivate_customer);

module.exports = router;