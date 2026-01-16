const mongoose = require("mongoose");

const miscBillSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Assuming you have a Student model
    required: true,
  },
  items: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  amountInWords: { type: String, required: true }, // Added field
  accountantName: { type: String, required: true }, // Added field
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  invoiceNo: {
    type: String,
    unique: true,
    sparse: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
});

module.exports = mongoose.model("MiscBill", miscBillSchema);
