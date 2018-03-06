const express     = require('express');
const router      = express.Router();
const book        = require('./books');
const customer    = require('./customer');
const transaction = require('./transaction')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api/books',book);
router.use('/api/customers',customer);
router.use('/api/transactions',transaction);

module.exports = router;
