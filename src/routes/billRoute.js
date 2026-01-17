 

const express = require('express');
const router = express.Router();
const { addPayment, getPayment } = require('../controllers/billController');  
 
router.post('/add-payment/:invoiceNo', addPayment);
router.get('/bill/:invoiceNo', getPayment);

module.exports = router;
 