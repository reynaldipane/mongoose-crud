const Customer      = require('../models/Customer')
const mongoose      = require('mongoose')

module.exports = {
    createCustomer : (req,res) => {
        Customer.create({
            name     : req.body.name,
            memberid : req.body.memberid,
            address  : req.body.address,
            zipcode  : req.body.zipcode,
            phone    : req.body.phone
        }, (err,customer) => {
            if (err) {
                return res.status(400).json({
                    message : `failed to insert data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `success insert data !`,
                data    : customer
            })

        })
    },

    findAll : (req,res) => {
        Customer.find()
        .exec()
        .then((customers) => {
            res.status(200).json({
                message : 'success get all data !',
                data    : customers
            })
        })
        .catch(err => {
            res.status(400).json({
                message : `failed to get all data ! err : ${err}`
            })
        })
    },

    findById : (req,res) => {
        Customer.findOne({
            _id : req.params.id
        })
        .exec()
        .then((customer) => {
            res.status(200).json({
                message : `succes get data !`,
                data    : customer
            })
        })
        .catch(err=>{
            res.status(400).json({
                message : `fail to get data ! err : ${err}`
            })
        })
    },

    updateCustomer : (req,res) => {
        Customer.findByIdAndUpdate(req.params.id,{
            name     : req.body.name,
            memberid : req.body.memberid,
            address  : req.body.address,
            zipcode  : req.body.zipcode,
            phone    : req.body.phone
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
    },

    deleteCustomer : (req,res) => {
        Customer.findByIdAndRemove(req.params.id,(err,customer) => {
            if (err) {
                res.status(400).json({
                    message : `Fail to delete data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `Success delete data !`,
                data : customer
            })
        })
    }
}