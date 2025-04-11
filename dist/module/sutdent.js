"use strict";

var mongoose = require("mongoose");
var studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    "default": 'Not Specified'
  },
  dob: {
    type: Date
  },
  // Use Date type for date of birth
  fatherName: {
    type: String,
    required: true
  },
  fatherMobile: {
    type: String,
    required: true
  },
  fatherEmail: {
    type: String,
    index: true
  },
  motherName: {
    type: String
  },
  motherMobile: {
    type: String
  },
  motherEmail: {
    type: String,
    index: true
  },
  area: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  age: {
    type: Number
  },
  // Use Number type for age
  plotNo: {
    type: String
  },
  // Optional field
  street: {
    type: String
  },
  // Optional field
  landmark: {
    type: String
  }
}, {
  timestamps: true
}); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("Student", studentSchema);