const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/worker');

router.post('/add_worker', controller.addWorker);

router.patch('/:workerID', controller.updateWorkerDetail);

router.delete('/:workerID', controller.deactivateWorker);

module.exports = router;