"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/expansiveController'),
  submitExpansive = _require.submitExpansive,
  getAllExpansive = _require.getAllExpansive,
  updateExpansive = _require.updateExpansive,
  deleteExpansive = _require.deleteExpansive,
  deleteCategory = _require.deleteCategory,
  updateCategory = _require.updateCategory,
  addCategory = _require.addCategory,
  getCategories = _require.getCategories;

// Route to submit a payment
router.post('/expansive', submitExpansive);

// Route to get all payments (optional)
router.get('/get-expansive', getAllExpansive);
router.put('/expansive/:id', updateExpansive);

// Route to delete an existing expansive by ID
router["delete"]('/expansive/:id', deleteExpansive);
router.get("/category", getCategories);
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router["delete"]("/category/:id", deleteCategory);
module.exports = router;