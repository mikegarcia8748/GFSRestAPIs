const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/attendance');

router.get('/get_worker_attendance');

router.post('/tag_present');

module.exports = router;