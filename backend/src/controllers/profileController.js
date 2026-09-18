const CandidateProfile = require('../models/CandidateProfile');
const RecruiterProfile = require('../models/RecruiterProfile');
const asyncHandler = require('../utils/asyncHandler');
const { calculateProfileCompletion } = require('../utils/helpers');

exports.getCandidateProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  let profile = await CandidateProfile.findOne({ userId }).populate('userId', 'name email avatar');
  if (!profile && userId.toString() === req.user._id.toString()) {
    profile = await CandidateProfile.create({ userId: req.user._id });
  }
  if (!profile) return res.status(404).json({ success: false, message: 'Candidate profile not found.' });
  res.json({ success: true, data: profile });
});

exports.updateCandidateProfile = asyncHandler(async (req, res) => {
  const completion = calculateProfileCompletion(req.body);
  const profile = await CandidateProfile.findOneAndUpdate(
    { userId: req.user._id },
    { ...req.body, profileCompletion: completion },
    { new: true, upsert: true, runValidators: true }
  ).populate('userId', 'name email avatar');

  res.json({ success: true, data: profile, message: 'Profile updated successfully.' });
});

exports.uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file received.' });
  const resumeUrl = `/uploads/${req.file.filename}`;
  const profile = await CandidateProfile.findOneAndUpdate(
    { userId: req.user._id },
    { resumeUrl },
    { new: true }
  );
  res.json({ success: true, data: profile, resumeUrl, message: 'Resume document uploaded successfully.' });
});

exports.getRecruiterProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  let profile = await RecruiterProfile.findOne({ userId }).populate('userId', 'name email avatar');
  if (!profile && userId.toString() === req.user._id.toString()) {
    profile = await RecruiterProfile.create({ userId: req.user._id, companyName: 'My Enterprise' });
  }
  if (!profile) return res.status(404).json({ success: false, message: 'Recruiter profile not found.' });
  res.json({ success: true, data: profile });
});

exports.updateRecruiterProfile = asyncHandler(async (req, res) => {
  const profile = await RecruiterProfile.findOneAndUpdate(
    { userId: req.user._id },
    req.body,
    { new: true, upsert: true, runValidators: true }
  ).populate('userId', 'name email avatar');

  res.json({ success: true, data: profile, message: 'Company profile updated successfully.' });
});

exports.getAllCandidates = asyncHandler(async (req, res) => {
  const candidates = await CandidateProfile.find()
    .populate('userId', 'name email avatar')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: candidates });
});
