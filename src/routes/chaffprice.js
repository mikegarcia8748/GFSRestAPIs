const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/chaffprice');

router.post('/add_price', checkAuth, controller.add_price);

router.get('/get_chaff_price', checkAuth, controller.get_chaff_price);

module.exports = router;