const Transaction      = require('../models/Transaction')
const Book             = require('../models/Book')
const Customer         = require('../models/Customer')
const mongoose         = require('mongoose')

module.exports = {
    createTransaction : (req,res) => {
        let dueDate    = new Date()
        dueDate.setDate(dueDate.getDate() + Number(req.body.days))

        Transaction.create({
            member     : req.body.member,
            days       : req.body.days,
            out_date   : new Date(),
            due_date   : dueDate,
            in_date    : req.body.in_date,
            fine       : req.body.fine,
            bookList   : req.body.bookList
        }, (err,transaction) => {
            if (err) {
                return res.status(400).json({
                    message : `failed to insert data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `success insert data !`,
                data    : transaction
            })

        })
    },

    findAll : (req,res) => {
        Transaction.find()
        .populate('bookList')
        .populate('member')
        .exec()
        .then((transactions) => {
            res.status(200).json({
                message : 'success get all data !',
                data    : transactions
            })
        })
        .catch(err => {
            res.status(400).json({
                message : `failed to get all data ! err : ${err}`
            })
        })
    },

    findById : (req,res) => {
        Transaction.findOne({
            _id : req.params.id
        })
        .populate('member')
        .populate('bookList')
        .exec()
        .then((transaction) => {
            res.status(200).json({
                message : `succes get data !`,
                data    : transaction
            })
        })
        .catch(err=>{
            res.status(400).json({
                message : `fail to get data ! err : ${err}`
            })
        })
    },

    updateTransaction : (req,res) => {
        Transaction.findOne({
            _id : req.params.id
        })
        .exec()
        .then((transaction) => {
            let _MS_PER_DAY = 1000 * 60 * 60 * 24;
            let inDate = new Date(req.body.in_date)

            let utc1   = Date.UTC(inDate.getFullYear(), inDate.getMonth(), inDate.getDate())
            let utc2   = Date.UTC(transaction.due_date.getFullYear(), transaction.due_date.getMonth(), transaction.due_date.getDate())
            
            let diff   = Math.floor((utc1 - utc2) / _MS_PER_DAY);

            let fine   = 0; 
            
            if (diff > 0) {
                fine   = diff * 1000
            }

            Transaction.findByIdAndUpdate(req.params.id,{
                in_date    : req.body.in_date,
                fine       : fine,
            }, {new :true}, (err,customer) => {
                if (err) {
                    res.status(400).json({
                        message : `failed to update data ! err : ${err}`
                    })
                }

                res.status(200).json({
                    message : `success to update data !`,
                    data    : customer
                })
            })
        })
        .catch(err=>{
            res.status(400).json({
                message : `fail to get data ! err : ${err}`
            })
        })
    },

    deleteTransaction : (req,res) => {
        Transaction.findByIdAndRemove(req.params.id,(err,transaction) => {
            if (err) {
                res.status(400).json({
                    message : `Fail to delete data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `Success delete data !`,
                data : transaction
            })
        })
    }
}