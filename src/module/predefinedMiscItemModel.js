const mongoose = require("mongoose");

const predefinedMiscItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "PredefinedMiscItem",
  predefinedMiscItemSchema
);