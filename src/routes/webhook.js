const express = require('express');
const router = express.Router();

router.post('/deployment_hook', (req, res, next) => {
    res.status(200).json({
        message: 'A deployment request has been received!'
    });
})

module.exports = router;