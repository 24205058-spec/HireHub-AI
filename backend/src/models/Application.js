const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String, default: '' },
  coverLetter: { type: String, default: '' },
  status: {
    type: String,
    enum: ['applied', 'under-review', 'shortlisted', 'interview', 'selected', 'rejected'],
    default: 'applied'
  },
  matchScore: { type: Number, default: 0 },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    note: { type: String, default: '' }
  }],
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
