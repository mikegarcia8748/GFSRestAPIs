const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Workers were fetch.'
    });
})

router.post('/', (req, res, next) => {
    const worker = {
        name: req.body.name,
        wage: req.body.wage 
    };
    res.status(201).json({
        message: 'Worker was added.',
        worker: worker
    });
})

router.get('/:workerID', (req, res, next) => {
    const id = req.params.workerID;
    if (id === 'special') {
        res.status(200).json({
            messaage: 'Worker details.',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You pass a worker ID parameter.'
        });
    }
})

router.patch('/:workerID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated worker!'
    });
})

router.delete('/:workerID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted workersssssss!'
    });
})

module.exports = router;