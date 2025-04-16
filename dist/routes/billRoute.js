"use strict";

// src/routes/billRoute.js

var express = require('express');
var router = express.Router();
var _require = require('../controllers/billCountroller'),
  addPayment = _require.addPayment; // Import the controller function

// Define the route for adding payment
router.post('/add-payment/:invoiceNo', addPayment);
router.get('/bill/:invoiceNo', getPayment);
module.exports = router;