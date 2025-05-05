// module/followUpModel.js
const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
  enquiryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' }, // Reference to the Student model
  followUpDate: { type: Date, required: true },
  remarks: { type: String, required: true },
}, { timestamps: true });

const FollowUp = mongoose.model('FollowUp', followUpSchema);
module.exports = FollowUp;
  