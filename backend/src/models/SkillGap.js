const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetJob: { type: String, required: true },
  existingSkills: [String],
  missingSkills: [String],
  recommendedSkills: [String],
  learningPath: [{ step: Number, skill: String, resources: [String], estimatedDuration: String, priority: String }],
}, { timestamps: true });

module.exports = mongoose.model('SkillGap', skillGapSchema);
