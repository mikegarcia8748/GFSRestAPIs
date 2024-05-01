const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                        return res.status(500).json({
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
                            res.status(201).json({
                                message: 'Account succesfully created.',
                                acount_mpin: mpin
                            })
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: error.message
                            })
                        })
                })
            } else {
                res.status(409).json({
                    message: 'User account already exist.'
                })
            }
        });
}

const get_mill_usernames = (req, res, next) => {
    User.find()
        .select('userName accountType')
        .exec()
        .then(result => {
           if (result.length < 1) {
            return res.status(404).json({
                message: 'No record found.'
            });
           } 
           
           res.status(200).json({
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
            res.status(500).json({
                message: error.message
            })
        });
}

const authenticate_mpin =  (req, res, next) => {
    User.findOne({userName: req.body.userName })
        .exec()
        .then(user => {
            if (user == null || user.length < 1) {
                return res.status(500).json({
                    message: 'Invalid account.'
                })
            }

            bcrypt.compare(req.body.mpin, user.userPIN, (error, success) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Authentication failed!',
                        error_message: error.message
                    });
                }

                if (success) {
                    console.log(process.env.JWT_KEY);
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
                        message: 'Authenticated',
                        data: {
                            token: token
                        }
                    })
                }

                return res.status(401).json({
                        message: 'Authentication failed!',
                        error_message: error.message
                });
            })
        })
        .catch(error => {
            res.status(500).json({
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
                message: 'Account succesfully deleted.'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
}

module.exports = {
    authenticate_mpin,
    create_account,
    get_mill_usernames,
    deactivateAccount,
}