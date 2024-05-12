const express = require('express');
const router = express.Router();
const mongoos = require('mongoose');

const millTransactionController = require('../controllers/milltransactions')

//Create Transaction and Payment...
router.post('/', millTransactionController.create_transaction);

module.exports = router;