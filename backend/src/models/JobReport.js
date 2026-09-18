const mongoose = require('mongoose');

const jobReportSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  qualityScore: { type: Number, default: 0 },
  missingInformation: [String],
  detectedIssues: [String],
  suggestions: [String],
}, { timestamps: true });

module.exports = mongoose.model('JobReport', jobReportSchema);
