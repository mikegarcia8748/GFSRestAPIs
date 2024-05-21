const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const create_account = (req, res, next) => {
    const fullName = req.body.fullName;
    const userName = req.body.userName;
    const accountType = req.body.accountType;
    
    User.find({fullName, userName})
        .exec()
        .then(result=> {
            if (result.length == 0) {

                // Generate 6 Digit MPIN
                const mpin = Math.floor(Math.random() * 899999 + 100000);

                bcrypt.hash(mpin.toString(), 10, (err, hash) => {
                    if (err) {
                        return res.status(200).json({
                            status: 'error',
                            statusCode: 500,
                            message: err.message
                        });
                    }

                    const userAccount = new User({
                        _id: new mongoose.Types.ObjectId(),
                        fullName: fullName,
                        userName: userName,
                        userPIN: hash, 
                        accountType: accountType
                    });
                    
                    userAccount.save()
                        .then(result => {
                            res.status(200).json({
                                status: 'success',
                                statusCode: 201,
                                message: 'Account succesfully created.',
                                acount_mpin: mpin
                            })
                        })
                        .catch(error => {
                            res.status(200).json({
                                status: 'error',
                                statusCode: 500,
                                message: error.message
                            })
                        })
                })
            } else {
                res.status(200).json({
                    status: 'error',
                    statusCode: 409,
                    message: 'User account already exist.'
                })
            }
        });
}

const get_authorize_users = (req, res, next) => {
    User.find({ isActivated: true, accountType: 0 })
        .select('userName accountType')
        .exec()
        .then(result => {
           if (result.length < 1) {
            return res.status(200).json({
                status: 'error',
                statusCode: 404,
                message: 'No record found.'
            });
           } 
           
           res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Users fetch succesfully.',
            data: result.map(user => {
                return {
                    userName: user.userName,
                    accountType: user.accountType
                }
            })
           })
        })
        .catch(error => {
            res.status(200).json({
                status: 'error',
                statusCode: 401,
                message: error.message
            })
        });
}

const authenticate_mpin =  (req, res, next) => {
    User.findOne({userName: req.body.userName })
        .exec()
        .then(user => {
            if (user == null || user.length < 1) {
                return res.status(200).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'Invalid account.'
                })
            }

            bcrypt.compare(req.body.mpin, user.userPIN, (error, success) => {
                if (error) {
                    return res.status(200).json({
                        status: 'error',
                        statusCode: 401,
                        message: 'Authentication failed!'
                    });
                }

                if (success) {
                    const token = jwt.sign(
                    {
                        userName: user.userName,
                        userID: user._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    })
                    return res.status(200).json({
                        status: 'success',
                        statusCode: 200,
                        message: 'Authenticated',
                        data: {
                            accessToken: token,
                            userID: user._id,
                            fullName: user.fullName,
                            userName: user.userName,
                            accountType: user.accountType
                        }
                    })
                }

                return res.status(200).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'Authentication failed!'
                });
            })
        })
        .catch(error => {
            res.status(200).json({
                status: 'error',
                statusCode: 500,
                message: error.message
            })
        })
}

const deactivateAccount =  (req, res, next) => {
    const filter = { _id: req.params.userId };
    const status = { isActivated: false };
    const options = { upsert: false };

    User.findOneAndUpdate(filter, update, options)
        .then(result => {
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Account succesfully deleted.'
            })
        })
        .catch(error => {
            res.status(200).json({
                status: 'success',
                statusCode: 201,
                message: error.message
            })
        })
}

module.exports = {
    authenticate_mpin,
    create_account,
    get_authorize_users,
    deactivateAccount,
}