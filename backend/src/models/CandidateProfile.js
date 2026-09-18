const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  field: String,
  startYear: Number,
  endYear: Number,
  grade: String,
});

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  current: { type: Boolean, default: false },
  description: String,
});

const certificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  date: String,
  url: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologies: [String],
  url: String,
});

const candidateProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  headline: { type: String, default: '' },
  bio: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [{ type: String }],
  certifications: [certificationSchema],
  projects: [projectSchema],
  portfolio: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  resumeScore: { type: Number, default: 0 },
  profileCompletion: { type: Number, default: 0 },
  preferredJobTypes: [String],
  preferredWorkModes: [String],
  expectedSalary: { type: String, default: '' },
  currentRole: { type: String, default: '' },
  yearsOfExperience: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);
