const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');

router.get('/get_worker_attendance');

router.post('/tag_present');

module.exports = router;