const mongoose = require("mongoose");

const expansiveSchema = new mongoose.Schema(
  {
    payeeName: { type: String, required: true },
    payeePhoneNumber: { type: String, required: true },
    particulars: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    amountInWords: { type: String, required: true },
    approved: { type: Boolean, default: false },
    invoiceNo: { type: String, unique: true },
    approvedAmount: {
      type: Number,
      default: 0, 
  },

    chequeDetails: { type: String, default: "" },
    category: {
      type: String,
      required: true,
    },
    paymentMode: { type: String },
    qrTransactionId: { type: String, default: "" },
    bankTransferId: { type: String, default: "" },
    cashDenominations: { type: String, default: "" },
    AccountentName: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expansive", expansiveSchema);
