"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/formController"),
  submitStudent = _require.submitStudent,
  getStudentById = _require.getStudentById,
  getAllStudents = _require.getAllStudents,
  submitForm = _require.submitForm,
  getFormById = _require.getFormById,
  getAllForm = _require.getAllForm,
  deleteForm = _require.deleteForm,
  deleteStudent = _require.deleteStudent,
  getCounts = _require.getCounts,
  approveForm = _require.approveForm,
  getApprovedForms = _require.getApprovedForms,
  payForm = _require.payForm,
  getPaymentsForForm = _require.getPaymentsForForm,
  getAllPayments = _require.getAllPayments,
  getPaymentHistory = _require.getPaymentHistory,
  getOverallPayment = _require.getOverallPayment;

// Form routes
router.post("/submit", submitForm);
router.get("/form/:id", getFormById);
router.get("/form", getAllForm);
router.put("/form/approve/:id", approveForm);
router.get("/approved", getApprovedForms); // Add this line for approval
router["delete"]('/forms/:id', deleteForm); // Fetch all students
// Fetch form by ID
router.get('/counts', getCounts);
router.get('/overall-payment', getOverallPayment);
// Student routes
router.post("/enquiry", submitStudent);
router.post('/:id/pay', payForm);
router.get('/:id/payments', getPaymentHistory);
router.get('/payments/:id', getPaymentsForForm);
router.get('/getbill', getAllPayments);
router.get("/students/:id", getStudentById);
router.get("/students", getAllStudents);
router["delete"]('/enq/:id', deleteStudent); // Fetch all students

module.exports = router;