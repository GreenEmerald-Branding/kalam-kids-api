const Form = require("../module/formModel");
const Student = require("../module/sutdent"); // Corrected the typo

exports.submitForm = async (req, res) => {
  try {
    const formData = req.body; // Get the data from the request body
    console.log("Received form data:", formData); // Log the incoming data

    const newForm = new Form(formData); // Create a new instance of the Form model
    await newForm.save(); // Save to the database

    res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form:", error.message);
    res.status(500).json({ success: false, message: "Failed to save form" });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    console.error("Error fetching form:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch form" });
  }
};
exports.getAllForm = async (req, res) => {
  try {
    const  form = await Form.find();
    res.status(200).json({ success: true, data:  form });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete form" });
  }
};

exports.submitStudent = async (req, res) => {
  try {
    const studentData = req.body;
    console.log("Received student data:", studentData);

    // Validate required fields
    if (!studentData.studentName) {
      return res.status(400).json({ success: false, message: "Student name is required" });
    }

    const student = new Student(studentData);
    await student.save();
    console.log("Student saved successfully:", student);
    res.status(201).json({ success: true, message: "Student submitted successfully", data: student });
  } catch (error) {
    console.error("Student submission error:", error.message);
    res.status(500).json({ success: false, message: "Submission failed", error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch student" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};