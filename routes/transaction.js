const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController')

router.get('/', transactionController.findAll)
router.get('/:id', transactionController.findById)
router.post('/', transactionController.createTransaction)
router.put('/:id', transactionController.updateTransaction)
router.delete('/:id', transactionController.deleteTransaction)

module.exports = router