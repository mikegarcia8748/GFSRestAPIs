const express = require('express');
const router = express.Router();

const controller = require('../controllers/chaffprice');

router.post('/add_price', controller.add_price);

router.get('/get_chaff_price', controller.get_chaff_price);

module.exports = router;