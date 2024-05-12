const mongoose = require('mongoose');

const user = require('../models/User')

const addWorker = (req, res, next) => {
    const worker = {
        name: req.body.name,
        wage: req.body.wage 
    };
    res.status(201).json({
        message: 'Worker was added.',
        worker: worker
    });
};

const getWorkers = (req, res, next) => {
    res.status(200).json({
        message: 'Workers were fetch.'
    });
};

const getWorkerDetail = (req, res, next) => {
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
};

const updateWorkerDetail = (req, res, next) => {
    res.status(200).json({
        message: 'Updated worker!'
    });
};

const deactivateWorker = (req, res, next) => {
    res.status(200).json({
        message: 'Deleted workersssssss!'
    });
};

module.exports = {
    addWorker,
    getWorkers,
    getWorkerDetail,
    updateWorkerDetail,
    deactivateWorker
}