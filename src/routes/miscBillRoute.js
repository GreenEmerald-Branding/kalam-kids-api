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
router.post('/misc-bills', createMiscBill);

// Get all miscellaneous bills
router.get('/misc-bills', getAllMiscBills);

// Get miscellaneous bills by student ID
router.get('/misc-bills/student/:studentId', getMiscBillsByStudent);

// Get a single miscellaneous bill by ID
router.get('/misc-bills/:id', getMiscBillById);

// Update a miscellaneous bill
router.put('/misc-bills/:id', updateMiscBill);

// Delete a miscellaneous bill
router.delete('/misc-bills/:id', deleteMiscBill);

module.exports = router;
