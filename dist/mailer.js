"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var nodemailer = require("nodemailer");
var fs = require("fs");
var path = require("path");

// ✅ Corrected Path to HTML Template
var emailTemplatePath = path.join(__dirname, "Templetes/emailTemplete.html");

// ✅ Read HTML File and Replace Variables
var generateEmailContent = function generateEmailContent(data) {
  try {
    var template = fs.readFileSync(emailTemplatePath, "utf-8");
    template = template.replace("{{name}}", data.name);
    template = template.replace("{{orderId}}", data.invoiceNo);
    template = template.replace("{{businessName}}", data.businessName);
    template = template.replace("{{totalCost}}", data.discountedPrice);
    return template;
  } catch (error) {
    console.error("❌ Error reading email template:", error);
    return "Error loading email template"; // Fallback content
  }
};

// ✅ Configure Email Transporter
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Function to Send Email
var sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(toEmail, data) {
    var emailContent, userMailOptions, adminMailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          emailContent = generateEmailContent(data); // ✅ Send confirmation to the user
          userMailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Your Order Confirmation - Green Emerald Agency",
            html: emailContent
          };
          _context.next = 5;
          return transporter.sendMail(userMailOptions);
        case 5:
          console.log("📧 Email sent to user:", toEmail);

          // ✅ Send notification to yourself
          adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: "greenemeraldagency@gmail.com",
            // Replace with your email
            subject: "📩 New Message Received",
            html: "\n        <p>You got a new message from: <strong>".concat(toEmail, "</strong></p>\n        <p><strong>Name:</strong> ").concat(data.name, "</p>\n        <p><strong>Order ID:</strong> ").concat(data.invoiceNo, "</p>\n        <p><strong>Business Name:</strong> ").concat(data.businessName, "</p>\n         <p><strong>Check Order Details:</strong> <a href=\"https://package.greenemeraldbranding.com/admin\" target=\"_blank\">Click here</a></p>\n      ")
          };
          _context.next = 9;
          return transporter.sendMail(adminMailOptions);
        case 9:
          console.log("📧 Admin notification sent!");
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("❌ Error sending email:", _context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function sendEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = sendEmail;