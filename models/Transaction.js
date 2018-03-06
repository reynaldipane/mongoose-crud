const mongoose      = require('mongoose')
const Schema        = mongoose.Schema

const transactionSchema    = new Schema({
    member : {
        type : Schema.Types.ObjectId, ref : 'Customer'
    },
    days : Number,
    out_date : Date,
    due_date : Date,
    in_date  : {
        type :Date,
        default : Date.now
    },
    fine     : Number,
    bookList : [
        { type : Schema.Types.ObjectId, ref : 'Book'}
    ],
    createdAt: {
        type :Date,
        default : Date.now
    },
    updatedAt : {
        type : Date
    }
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction