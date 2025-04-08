const express = require("express");
const router = express.Router();
const {   submitStudent, getStudentById, getAllStudents } = require("../controllers/formController");

// Form routes
// router.post("/submit", submitForm);
// router.get("/form/:id", getFormById); // Fetch form by ID

// Student routes
router.post("/enquiry", submitStudent);
router.get("/students/:id", getStudentById); // Fetch student by ID
router.get("/students", getAllStudents); // Fetch all students

module.exports = router;