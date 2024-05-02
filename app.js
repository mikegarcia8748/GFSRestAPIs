const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const customerRoutes = require('./src/routes/customers');
const workerRoutes = require('./src/routes/workers');
const account = require('./src/routes/account')
const webHookRoute = require('./src/routes/webhook');

const localhost = process.env.MONGODB_LOCALHOST;
const dbName = process.env.MONGODB_NAME;

mongoose.connect(
    localhost,
    {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: dbName
    }
    )
    .then(() => {
        console.log("MongoDB Connected!")
    })
    .catch(error => {
        console.log("Error making database connection.")
        console.log(error.message)
    });

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
app.use('/account', account);
app.use('/webhook', webHookRoute);

app.use((req, res, next) => {
    const error = new Error('Unauthenticated...');
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