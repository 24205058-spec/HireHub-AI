const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'RecruiterProfile' },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  responsibilities: [String],
  requirements: [String],
  skills: [String],
  experience: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 5 }
  },
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' }
  },
  location: { type: String, default: 'Remote' },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    default: 'full-time'
  },
  workMode: {
    type: String,
    enum: ['remote', 'on-site', 'hybrid'],
    default: 'remote'
  },
  openings: { type: Number, default: 1 },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  qualityScore: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  applicationCount: { type: Number, default: 0 },
}, { timestamps: true });

jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);
