const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/millserviceprice');

router.get('/get_mill_price', checkAuth, controller.getMillPrice);

router.post('/add_price', checkAuth, controller.addNewPrice);

module.exports = router;