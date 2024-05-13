const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');

// Create account for users and workers...
router.post('/create_account', accountController.create_account);

// Get Usernames for Rice Mill Users...
router.get('/get_authorize_users', accountController.get_authorize_users);

// User Authentication...
router.post('/authenticate_mpin', accountController.authenticate_mpin);

// Deactivate Account...
router.patch('/:userId', accountController.deactivateAccount);

module.exports = router;