const express = require('express');
const router = express.Router();
 
const { submitExpansive, getAllExpansive, updateExpansive, deleteExpansive, deleteCategory, updateCategory, addCategory, getCategories, approveExpansive } = require('../controllers/expansiveController');

 
router.post('/expansive', submitExpansive);

 
router.get('/get-expansive', getAllExpansive);
router.put('/expansive/:id', updateExpansive);
router.post('/expansive/:id/approve', approveExpansive);
router.delete('/expansive/:id', deleteExpansive);
router.get("/category", getCategories); 
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);
module.exports = router;    