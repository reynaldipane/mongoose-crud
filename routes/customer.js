const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController')

router.get('/', customerController.findAll)
router.get('/:id', customerController.findById)
router.post('/', customerController.createCustomer)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)

module.exports = router