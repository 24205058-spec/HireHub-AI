const mongoose = require('mongoose');

const candidateInterestSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'RecruiterProfile', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'contacted'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('CandidateInterest', candidateInterestSchema);
