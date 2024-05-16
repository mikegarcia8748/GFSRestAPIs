const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/attendance');

router.get('/get_attendance/:workerID', checkAuth, controller.getAttendance);

router.post('/create_attendance', checkAuth, controller.timeInAttendance);

module.exports = router;