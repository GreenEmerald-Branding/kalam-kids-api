"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var Form = require("../module/formModel");
var Student = require("../module/sutdent"); // Corrected the typo
// const { sendEmail } = require('../mailer'); 
var _require = require('../mailer'),
  sendInquiryEmail = _require.sendInquiryEmail; // Adjust the path as necessary
// Adjust the path as necessary
exports.submitForm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var formData, newForm;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          formData = req.body; // Get the data from the request body
          console.log("Received form data:", formData); // Log the incoming data
          newForm = new Form(formData); // Create a new instance of the Form model
          _context.next = 6;
          return newForm.save();
        case 6:
          // Save to the database

          res.status(201).json({
            success: true,
            message: "Form submitted successfully"
          });
          _context.next = 13;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error saving form:", _context.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to save form"
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getFormById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, form;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return Form.findById(id);
        case 4:
          form = _context2.sent;
          if (form) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            data: form
          });
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching form:", _context2.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch form"
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllForm = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var form;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Form.find();
        case 3:
          form = _context3.sent;
          res.status(200).json({
            success: true,
            data: form
          });
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error fetching students:", _context3.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch students"
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteForm = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, form;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return Form.findByIdAndDelete(id);
        case 4:
          form = _context4.sent;
          if (form) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            message: "Form deleted successfully"
          });
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error("Error deleting form:", _context4.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete form"
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.submitStudent = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var studentData, newStudent;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          studentData = req.body;
          console.log("Received student data:", studentData);

          // Validate required fields
          if (!(!studentData.studentName || !studentData.fatherName || !studentData.fatherMobile)) {
            _context5.next = 5;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            success: false,
            message: "All fields are required"
          }));
        case 5:
          // Create a new student instance
          newStudent = new Student(studentData);
          _context5.next = 8;
          return newStudent.save();
        case 8:
          if (!studentData.fatherEmail) {
            _context5.next = 11;
            break;
          }
          _context5.next = 11;
          return sendInquiryEmail(studentData.fatherEmail, studentData);
        case 11:
          if (!studentData.motherEmail) {
            _context5.next = 14;
            break;
          }
          _context5.next = 14;
          return sendInquiryEmail(studentData.motherEmail, studentData);
        case 14:
          res.status(201).json({
            success: true,
            message: "Student submitted successfully",
            data: newStudent
          });
          _context5.next = 21;
          break;
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](0);
          console.error("Student submission error:", _context5.t0.message);
          res.status(500).json({
            success: false,
            message: "Submission failed",
            error: _context5.t0.message
          });
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 17]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getCounts = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var studentCount, formCount;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Student.countDocuments();
        case 3:
          studentCount = _context6.sent;
          _context6.next = 6;
          return Form.countDocuments();
        case 6:
          formCount = _context6.sent;
          res.status(200).json({
            success: true,
            data: {
              students: studentCount,
              forms: formCount
            }
          });
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error("Error getting counts:", _context6.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to get counts"
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getStudentById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, student;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return Student.findById(id);
        case 4:
          student = _context7.sent;
          if (student) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            success: false,
            message: "Student not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            data: student
          });
          _context7.next = 14;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error("Error fetching student:", _context7.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch student"
          });
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getAllStudents = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var students;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return Student.find();
        case 3:
          students = _context8.sent;
          res.status(200).json({
            success: true,
            data: students
          });
          _context8.next = 11;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.error("Error fetching students:", _context8.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch students"
          });
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deleteStudent = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var id, student;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          _context9.next = 4;
          return Student.findByIdAndDelete(id);
        case 4:
          student = _context9.sent;
          if (student) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            success: false,
            message: "Student not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            message: "Student deleted successfully"
          });
          _context9.next = 14;
          break;
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          console.error("Error deleting student:", _context9.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete student"
          });
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();