const express = require("express");
const router = express.Router();
const {   submitStudent, getStudentById, getAllStudents, submitForm, getFormById, getAllForm, deleteForm } = require("../controllers/formController");

// Form routes
router.post("/submit", submitForm);
router.get("/form/:id", getFormById);
router.get("/form", getAllForm);
router.delete('/forms/:id', deleteForm); // Fetch all students
 // Fetch form by ID

// Student routes
router.post("/enquiry", submitStudent);
router.get("/students/:id", getStudentById); 
router.get("/students", getAllStudents);  

module.exports = router;