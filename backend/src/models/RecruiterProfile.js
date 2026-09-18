const mongoose = require('mongoose');

const recruiterProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, required: true },
  companyDescription: { type: String, default: '' },
  website: { type: String, default: '' },
  location: { type: String, default: '' },
  industry: { type: String, default: '' },
  companySize: { type: String, default: '' },
  logo: { type: String, default: '' },
  founded: { type: String, default: '' },
  benefits: [String],
  techStack: [String],
  culture: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('RecruiterProfile', recruiterProfileSchema);
