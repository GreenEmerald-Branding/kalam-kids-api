"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
// const expansive = require('../module/expansive');
var expansive = require('../module/expansive');
var Category = require("../module/Category");
exports.submitExpansive = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var ExpansiveData, newExpansive;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ExpansiveData = req.body; // Create a new payment instance
          newExpansive = new expansive(ExpansiveData); // Save to the database
          _context.next = 5;
          return newExpansive.save();
        case 5:
          res.status(201).json({
            success: true,
            message: "Payment submitted successfully",
            data: newExpansive
          });
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Error saving payment:", _context.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to save payment",
            error: _context.t0.message
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
exports.getAllExpansive = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var expansives;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return expansive.find();
        case 3:
          expansives = _context2.sent;
          res.status(200).json({
            success: true,
            data: expansives
          });
          _context2.next = 11;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching payments:", _context2.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch payments"
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateExpansive = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, updatedData, lastOrder, lastNumber, numberPart, updatedExpansive;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id; // Get the ID from the request parameters
          updatedData = req.body; // Get the updated data from the request body
          // Check if the record is being approved
          if (!updatedData.approved) {
            _context3.next = 10;
            break;
          }
          _context3.next = 6;
          return expansive.find({
            invoiceNo: {
              $regex: /^VR-\d{6}$/
            }
          }).sort({
            invoiceNo: -1
          }) // Sort invoiceNo descending
          .limit(1);
        case 6:
          lastOrder = _context3.sent;
          lastNumber = 1080; // Default starting number
          if (lastOrder.length > 0) {
            numberPart = parseInt(lastOrder[0].invoiceNo.split("-")[1]);
            if (!isNaN(numberPart)) {
              lastNumber = numberPart;
            }
          }
          updatedData.invoiceNo = "VR-".concat(String(lastNumber + 1).padStart(6, "0")); // Generate new invoice number
        case 10:
          _context3.next = 12;
          return expansive.findByIdAndUpdate(id, updatedData, {
            "new": true
          });
        case 12:
          updatedExpansive = _context3.sent;
          if (updatedExpansive) {
            _context3.next = 15;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Expansive not found"
          }));
        case 15:
          res.status(200).json({
            success: true,
            message: "Expansive updated successfully",
            data: updatedExpansive
          });
          _context3.next = 22;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          console.error("Error updating expansive:", _context3.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to update expansive",
            error: _context3.t0.message
          });
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteExpansive = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, deletedExpansive;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id; // Get the ID from the request parameters
          // Find the expansive record by ID and delete it
          _context4.next = 4;
          return expansive.findByIdAndDelete(id);
        case 4:
          deletedExpansive = _context4.sent;
          if (deletedExpansive) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "Expansive not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            message: "Expansive deleted successfully"
          });
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error("Error deleting expansive:", _context4.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete expansive",
            error: _context4.t0.message
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
exports.getCategories = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Category.find();
        case 3:
          categories = _context5.sent;
          res.status(200).json({
            success: true,
            data: categories
          });
          _context5.next = 11;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error("Error fetching categories:", _context5.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
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
exports.addCategory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var name, newCategory;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          name = req.body.name;
          newCategory = new Category({
            name: name
          });
          _context6.next = 5;
          return newCategory.save();
        case 5:
          res.status(201).json({
            success: true,
            data: newCategory
          });
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error("Error adding category:", _context6.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to add category"
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateCategory = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, name, updatedCategory;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          name = req.body.name;
          _context7.next = 5;
          return Category.findByIdAndUpdate(id, {
            name: name
          }, {
            "new": true
          });
        case 5:
          updatedCategory = _context7.sent;
          if (updatedCategory) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            success: false,
            message: "Category not found"
          }));
        case 8:
          res.status(200).json({
            success: true,
            data: updatedCategory
          });
          _context7.next = 15;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error("Error updating category:", _context7.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to update category"
          });
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deleteCategory = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, deletedCategory;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 4;
          return Category.findByIdAndDelete(id);
        case 4:
          deletedCategory = _context8.sent;
          if (deletedCategory) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            success: false,
            message: "Category not found"
          }));
        case 7:
          res.status(200).json({
            success: true,
            message: "Category deleted successfully"
          });
          _context8.next = 14;
          break;
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error("Error deleting category:", _context8.t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete category"
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();