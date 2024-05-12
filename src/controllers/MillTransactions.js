const mongoos = require('mongoose');
const MillTransaction = require('../models/MIllTransaction');
const MillPayment = require('../models/MillPayment');
const CustomerBalance = require('../models/CustomerBalance');

const create_transaction = (req, res, next) => {
    const customerID = req.body.customerID;
    const entryBy = req.body.entryBy;
    const riceWeight = req.body.riceWeight;
    const sixtyKgs = req.body.sixtyKgs;
    const fiftyKgs = req.body.fiftyKgs;
    const thirtyKgs = req.body.thirtyKgs;
    const twentyFiveKgs = req.body.twentyFiveKgs;
    const chaffWeight = req.body.chaffWeight;
    const millPrice = req.body.millPrice;
    const chaffPrice = req.body.chaffPrice;
    const subTotal = req.body.subTotal;
    const deductions = req.body.deductions;
    const amountPaid = req.body.amountPaid;
    const balance = req.body.balance;
    
    const millTransaction = new MillTransaction({
        _id: new mongoos.Types.ObjectId(),
        customerID: customerID,
        entryBy: entryBy,
        riceWeight: riceWeight,
        sixtyKgs: sixtyKgs,
        fiftyKgs, fiftyKgs,
        thirtyKgs: thirtyKgs,
        twentyFiveKgs: twentyFiveKgs,
        chaffWeight: chaffWeight
    });

    millTransaction
        .save()
        .then(result => {
            const millPayment = new MillPayment({
                _id: new mongoos.Types.ObjectId(),
                referenceID: result._id,
                millPrice: millPrice,
                chaffPrice: chaffPrice,
                subTotal: subTotal,
                deductions: deductions,
                amountPaid: amountPaid,
                balance: balance
            })
        
            millPayment
                .save()
                .then(result => {
                    return res.status(201).json({
                        status: "success",
                        statusCode: "200",
                        message: 'Transaction successfully save.'
                    })
                })
            
            if (balance !== 0) {
                const customerBalance = new CustomerBalance({
                    _id: new mongoos.Types.ObjectId(),
                    customerID: customerID,
                    remarks: 'Milling balance',
                    amount: balance
                })

                customerBalance.save()
                    .then(result => {
                        console.log("Customer balance saved!")
                    })
            }
        })
        .catch(error => {
            return res.status(200).json({
                status: "error",
                statusCode: "500",
                message: error.message
            })
        })
};


module.exports = {
    create_transaction
}