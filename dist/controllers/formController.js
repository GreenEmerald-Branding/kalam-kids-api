"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var Form = require("../module/formModel");
var Student = require("../module/sutdent"); // Corrected the typo

exports.submitForm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var formData, form;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          formData = req.body;
          form = new Form(formData);
          _context.next = 5;
          return form.save();
        case 5:
          res.status(201).json({
            success: true,
            message: "Form submitted successfully"
          });
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Form submission error:", _context.t0.message);
          res.status(500).json({
            success: false,
            message: "Submission failed"
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
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
exports.submitStudent = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var studentData, student;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          studentData = req.body;
          console.log("Received student data:", studentData);

          // Validate required fields
          if (studentData.studentName) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Student name is required"
          }));
        case 5:
          student = new Student(studentData);
          _context3.next = 8;
          return student.save();
        case 8:
          console.log("Student saved successfully:", student);
          res.status(201).json({
            success: true,
            message: "Student submitted successfully",
            data: student
          });
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error("Student submission error:", _context3.t0.message);
          res.status(500).json({
            success: false,
            message: "Submission failed",
            error: _context3.t0.message
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getStudentById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, student;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return Student.findById(id);
        case 4:
          student = _context4.sent;
          if (student) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "Student not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            data: student
          });
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error("Error fetching student:", _context4.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch student"
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
exports.getAllStudents = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var students;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Student.find();
        case 3:
          students = _context5.sent;
          res.status(200).json({
            success: true,
            data: students
          });
          _context5.next = 11;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error("Error fetching students:", _context5.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch students"
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();