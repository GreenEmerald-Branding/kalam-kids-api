 

const express = require('express');
const router = express.Router();
const { addPayment } = require('../controllers/billCountroller');  
 
router.post('/add-payment/:invoiceNo', addPayment);
router.get('/bill/:invoiceNo', getPayment);



module.exports = router;
 