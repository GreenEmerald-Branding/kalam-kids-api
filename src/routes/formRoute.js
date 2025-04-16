const express = require("express");
const router = express.Router();
const {   submitStudent, getStudentById, getAllStudents, submitForm, getFormById, getAllForm, deleteForm, deleteStudent, getCounts, approveForm, getApprovedForms, payForm, getPaymentsForForm, getAllPayments, getPaymentHistory, } = require("../controllers/formController");
 

// Form routes
router.post("/submit", submitForm);
router.get("/form/:id", getFormById);
router.get("/form", getAllForm);
router.put("/form/approve/:id", approveForm);
router.get("/approved", getApprovedForms); // Add this line for approval
router.delete('/forms/:id', deleteForm); // Fetch all students
 // Fetch form by ID
 router.get('/counts', getCounts);
// Student routes
router.post("/enquiry", submitStudent);
router.post('/:id/pay', payForm);
router.get('/:id/payments', getPaymentHistory);
router.get('/payments/:id', getPaymentsForForm);
router.get('/getbill', getAllPayments); 
router.get("/students/:id", getStudentById); 
router.get("/students", getAllStudents);
router.delete('/enq/:id', deleteStudent); // Fetch all students


module.exports = router;