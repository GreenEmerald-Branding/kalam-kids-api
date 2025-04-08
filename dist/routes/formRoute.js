"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/formController"),
  submitStudent = _require.submitStudent,
  getStudentById = _require.getStudentById,
  getAllStudents = _require.getAllStudents;

// Form routes
// router.post("/submit", submitForm);
// router.get("/form/:id", getFormById); // Fetch form by ID

// Student routes
router.post("/enquiry", submitStudent);
router.get("/students/:id", getStudentById); // Fetch student by ID
router.get("/students", getAllStudents); // Fetch all students

module.exports = router;