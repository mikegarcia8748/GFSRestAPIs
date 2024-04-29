const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const { nextTick } = require('process');
const { randomInt } = require('crypto');

// Create account for users and workers
router.post('/', (req, res, nextTick => {

    const fullName = req.body.fullName;
    const userName = req.body.userName;
    const accountType = req.body.accountType;

    User.find({fullName, userName})
        .select('fullName userName')
        .then(result=> {
            if (result.length == 0) {
                const mpin = randomInt(0, 999999).toString().paddStart(6, '0');
                console.log(mpin);
            } else {
                
            }
        })
        .catch(error => {
            res.status(200).json({
                message: error.message
            })
        })
}))