const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const resumeAnalyzer = require('../services/ai/resumeAnalyzer');
const jobMatcher = require('../services/ai/jobMatcher');
const skillGapAnalyzer = require('../services/ai/skillGapAnalyzer');
const careerPath = require('../services/ai/careerPath');
const careerSimulator = require('../services/ai/careerSimulator');
const jobQualityAnalyzer = require('../services/ai/jobQualityAnalyzer');
const candidateRanking = require('../services/ai/candidateRanking');
const CandidateProfile = require('../models/CandidateProfile');
const Job = require('../models/Job');

router.post('/resume-analyze', protect, authorize('candidate'), asyncHandler(async (req, res) => {
  const profile = await CandidateProfile.findOne({ userId: req.user._id });
  if (!profile) return res.status(404).json({ success: false, message: 'Candidate profile record missing.' });
  if (!profile.resumeUrl && (!profile.skills || profile.skills.length === 0)) {
    return res.status(400).json({ success: false, message: 'Please upload your resume document in your profile before running analysis.' });
  }
  const result = resumeAnalyzer.analyzeResume(profile);
  profile.resumeScore = result.overallScore;
  await profile.save();
  res.json({ success: true, data: result });
}));

router.post('/job-match', protect, authorize('candidate'), asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const [profile, job] = await Promise.all([
    CandidateProfile.findOne({ userId: req.user._id }),
    Job.findById(jobId),
  ]);
  if (!profile) return res.status(404).json({ success: false, message: 'Candidate profile not found.' });
  if (!job) return res.status(404).json({ success: false, message: 'Job listing not found.' });
  const result = jobMatcher.calculateMatch(profile, job);
  res.json({ success: true, data: result });
}));

router.post('/skill-gap', protect, authorize('candidate'), asyncHandler(async (req, res) => {
  const { targetJob } = req.body;
  const profile = await CandidateProfile.findOne({ userId: req.user._id });
  const result = skillGapAnalyzer.analyzeSkillGap(profile?.skills || [], targetJob || 'Full Stack Developer');
  res.json({ success: true, data: result });
}));

router.post('/career-path', protect, authorize('candidate'), asyncHandler(async (req, res) => {
  const { currentRole, targetRole } = req.body;
  const result = careerPath.generateCareerPath(currentRole || 'Frontend Developer', targetRole || 'Full Stack Developer');
  res.json({ success: true, data: result });
}));

router.post('/simulator', protect, authorize('candidate'), asyncHandler(async (req, res) => {
  const { skillsToAdd } = req.body;
  const profile = await CandidateProfile.findOne({ userId: req.user._id });
  const result = careerSimulator.simulate(profile?.skills || [], skillsToAdd || ['Node.js', 'Docker']);
  res.json({ success: true, data: result });
}));

router.post('/job-quality', protect, authorize('recruiter', 'admin'), asyncHandler(async (req, res) => {
  const result = jobQualityAnalyzer.analyzeJobQuality(req.body);
  res.json({ success: true, data: result });
}));

router.post('/candidate-ranking', protect, authorize('recruiter', 'admin'), asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
  const candidates = await CandidateProfile.find().populate('userId', 'name email avatar').limit(50);
  const ranked = candidateRanking.rankCandidates(candidates, job);
  res.json({ success: true, data: ranked });
}));

module.exports = router;
