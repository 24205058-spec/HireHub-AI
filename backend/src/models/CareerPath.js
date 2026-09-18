const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentRole: { type: String, required: true },
  targetRole: { type: String, required: true },
  stages: [{
    role: String,
    requiredSkills: [String],
    suggestedProjects: [String],
    technologies: [String],
    estimatedDuration: String,
  }],
  requiredSkills: [String],
  totalDuration: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('CareerPath', careerPathSchema);
