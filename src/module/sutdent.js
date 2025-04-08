const mongoose = require("mongoose");

const student = new mongoose.Schema({
  studentName: { type: String },
  gender: { type: String },
  dob: { type: Date }, // Use Date type for date of birth
  fatherName: { type: String },
  fatherMobile: { type: String },
  fatherEmail: { type: String },
  motherName: { type: String },
  motherMobile: { type: String },
  motherEmail: { type: String },
  area: { type: String },
  city: { type: String },
  state: { type: String },
  age: { type: Number }, // Use Number type for age
  plotNo: { type: String }, // Optional field
  street: { type: String }, // Optional field
  landmark: { type: String }, // Optional field
},); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("Student", student);