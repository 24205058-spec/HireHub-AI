const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  score: { type: Number, default: 0 },
  reasons: [String],
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
