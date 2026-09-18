const mongoose = require('mongoose');

const reverseHiringSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'RecruiterProfile' },
  message: { type: String, required: true },
  skills: [String],
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'interview'], default: 'pending' },
  recruiterNote: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ReverseHiringRequest', reverseHiringSchema);
