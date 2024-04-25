const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /customers'
    });
})

router.post('/', (req, res, next) => {
    const customer = {
        name: req.body.name,
        alias: req.body.alias
    }
    res.status(200).json({
        message: 'Handling POST request to /customers',
        customer: customer
    });
})

router.get('/:customerID', (req, res, next) => {
    const id = req.params.customerID;
    if (id === 'special') {
        res.status(200).json({
            messaage: 'You discovered the special ID.',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You pass a customer ID parameter.'
        });
    }
})

router.patch('/:customerID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated customer!'
    });
})

router.delete('/:customerID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted customer!'
    });
})

module.exports = router;