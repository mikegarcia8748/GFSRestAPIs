const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/worker');

router.post('/add_worker', checkAuth, controller.addWorker);

router.get('/get_employees', checkAuth, controller.getWorkers);

router.patch('/:workerID', checkAuth, controller.updateWorkerDetail);

router.delete('/:workerID', checkAuth, controller.deactivateWorker);

module.exports = router;