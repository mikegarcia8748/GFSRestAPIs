const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const customerController = require('../controllers/customer')

// Get List of Customers
router.get('/get_customers/:index', checkAuth, customerController.get_customers);

// Add Customer
router.post('/add_customer', checkAuth, customerController.add_customer);

// Get Customer Info
router.get('/:customerID', checkAuth, customerController.get_customer);

// Search Customer
router.get('/search/:customerName', checkAuth, customerController.search_customer);

// Update Customer Details/Status...
router.patch('/:customerID', checkAuth, customerController.update_customer);

// Deactivate Customer Information...
router.patch('/:customerID', checkAuth, customerController.deactivate_customer);

module.exports = router;