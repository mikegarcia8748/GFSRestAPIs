const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser')

const customerRoutes = require('./api/routes/customers');
const workerRoutes = require('./api/routes/workers');
const bodyParser = require('body-parser');

require('./database/mysql.db');

app.use(express.json());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Origin",
        "Origin, Content-Type, Accept, Authorization"
    );
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/customers', customerRoutes);
app.use('/workers', workerRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;