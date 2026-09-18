const mongoose = require('mongoose');

const aiMatchResultSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  overallScore: { type: Number, default: 0 },
  skillScore: { type: Number, default: 0 },
  experienceScore: { type: Number, default: 0 },
  educationScore: { type: Number, default: 0 },
  locationScore: { type: Number, default: 0 },
  explanation: [String],
  matchedSkills: [String],
  missingSkills: [String],
}, { timestamps: true });

module.exports = mongoose.model('AIMatchResult', aiMatchResultSchema);
