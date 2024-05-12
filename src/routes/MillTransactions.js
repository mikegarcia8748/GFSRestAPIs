const express = require('express');
const router = express.Router();
const mongoos = require('mongoose');

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/milltransactions');

//Save Billing Transaction...
router.post('/save_billing', checkAuth, controller.create_transaction);

module.exports = router;