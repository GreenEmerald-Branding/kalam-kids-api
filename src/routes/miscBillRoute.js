const express = require('express');
const router = express.Router();
const {
    createMiscBill,
    getAllMiscBills,
    getMiscBillsByStudent,
    getMiscBillById,
    updateMiscBill,
    deleteMiscBill,
} = require('../controllers/miscBillController');

// Create a new miscellaneous bill
router.post('/', createMiscBill);

// Get all miscellaneous bills
router.get('/', getAllMiscBills);

// Get miscellaneous bills by student ID
router.get('/student/:studentId', getMiscBillsByStudent);

// Get a single miscellaneous bill by ID
router.get('/:id', getMiscBillById);

// Update a miscellaneous bill
router.put('/:id', updateMiscBill);

// Delete a miscellaneous bill
router.delete('/:id', deleteMiscBill);

module.exports = router;
