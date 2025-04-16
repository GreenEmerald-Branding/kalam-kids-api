// src/routes/billRoute.js

const express = require('express');
const router = express.Router();
const { addPayment } = require('../controllers/billCountroller'); // Import the controller function

// Define the route for adding payment
router.post('/add-payment/:invoiceNo', addPayment);
router.get('/bill/:invoiceNo', getPayment);



module.exports = router;
 