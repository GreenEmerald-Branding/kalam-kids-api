const express = require('express');
const router = express.Router();
 
const { submitExpansive, getAllExpansive, updateExpansive, deleteExpansive, deleteCategory, updateCategory, addCategory, getCategories } = require('../controllers/expansiveController');

// Route to submit a payment
router.post('/expansive', submitExpansive);

// Route to get all payments (optional)
router.get('/get-expansive', getAllExpansive);
router.put('/expansive/:id', updateExpansive);

// Route to delete an existing expansive by ID
router.delete('/expansive/:id', deleteExpansive);
router.get("/category", getCategories); 
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);
module.exports = router;