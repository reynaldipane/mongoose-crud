const Book      = require('../models/Book')
const mongoose  = require('mongoose')

module.exports = {
    createBook : (req,res) => {
        Book.create({
            isbn     : req.body.isbn,
            title    : req.body.title,
            author   : req.body.author,
            category : req.body.category,
            stock    : req.body.stock
        }, (err,book) => {
            if (err) {
                return res.status(400).json({
                    message : `failed to insert data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `success insert data !`,
                data    : book
            })

        })
    },

    findAll : (req,res) => {
        Book.find()
        .exec()
        .then((books) => {
            res.status(200).json({
                message : 'success get all data !',
                data    : books
            })
        })
        .catch(err => {
            res.status(400).json({
                message : `failed to get all data ! err : ${err}`
            })
        })
    },

    findById : (req,res) => {
        Book.findOne({
            _id : req.params.id
        }, {

        })
        .exec()
        .then((book) => {
            res.status(200).json({
                message : `succes get data !`,
                data    : book
            })
        })
        .catch(err=>{
            res.status(400).json({
                message : `fail to get data ! err : ${err}`
            })
        })
    },

    updateBook : (req,res) => {
        Book.findByIdAndUpdate(req.params.id,{
            isbn     : req.body.isbn,
            title    : req.body.title,
            author   : req.body.author,
            category : req.body.category,
            stock    : req.body.stock
        }, {new :true}, (err,book) => {
            if (err) {
                res.status(400).json({
                    message : `failed to update data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `success to update data !`,
                data    : book
            })
        })
    },

    deleteBook : (req,res) => {
        Book.findByIdAndRemove(req.params.id,(err,book) => {
            if (err) {
                res.status(400).json({
                    message : `Fail to delete data ! err : ${err}`
                })
            }

            res.status(200).json({
                message : `Success delete data !`,
                data : book
            })
        })
    }
}