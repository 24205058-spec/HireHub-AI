const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  meetingLink: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'], default: 'scheduled' },
  type: { type: String, enum: ['technical', 'hr', 'behavioral', 'final'], default: 'technical' },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
