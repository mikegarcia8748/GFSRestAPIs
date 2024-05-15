const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const controller = require('../controllers/expenses');

router.post('/add_expenses', checkAuth, controller.addExpenses);

router.get('/get_expenses', checkAuth, controller.getExpenses);

module.exports = router;