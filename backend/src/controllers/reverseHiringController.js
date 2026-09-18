const ReverseHiringRequest = require('../models/ReverseHiringRequest');
const RecruiterProfile = require('../models/RecruiterProfile');
const CandidateProfile = require('../models/CandidateProfile');
const asyncHandler = require('../utils/asyncHandler');
const { createNotification } = require('../utils/helpers');

exports.getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await RecruiterProfile.find()
    .populate('userId', 'name email avatar')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: companies });
});

exports.createRequest = asyncHandler(async (req, res) => {
  const { recruiterId, companyId, message, skills } = req.body;

  const candidateProfile = await CandidateProfile.findOne({ userId: req.user._id });
  const selectedSkills = skills || candidateProfile?.skills || ['Full Stack Development'];

  const request = await ReverseHiringRequest.create({
    candidateId: req.user._id,
    recruiterId,
    companyId,
    message,
    skills: selectedSkills,
    status: 'pending',
  });

  await createNotification(
    recruiterId,
    'Reverse Hiring Invitation Received',
    `Candidate ${req.user.name} expressed direct interest in joining your team.`,
    'reverse-hiring',
    '/recruiter/reverse-hiring'
  );

  res.status(201).json({ success: true, data: request, message: 'Reverse hiring interest expressed.' });
});

exports.getMyRequests = asyncHandler(async (req, res) => {
  const requests = await ReverseHiringRequest.find({ candidateId: req.user._id })
    .populate('recruiterId', 'name email avatar')
    .populate('companyId')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: requests });
});

exports.getRecruiterRequests = asyncHandler(async (req, res) => {
  const requests = await ReverseHiringRequest.find({ recruiterId: req.user._id })
    .populate('candidateId', 'name email avatar')
    .populate('companyId')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: requests });
});

exports.updateRequestStatus = asyncHandler(async (req, res) => {
  const { status, recruiterNote } = req.body;
  const request = await ReverseHiringRequest.findOne({ _id: req.params.id, recruiterId: req.user._id });
  if (!request) return res.status(404).json({ success: false, message: 'Reverse hiring request not found.' });

  request.status = status;
  if (recruiterNote) request.recruiterNote = recruiterNote;
  await request.save();

  await createNotification(
    request.candidateId,
    'Reverse Hiring Update',
    `Your reverse hiring inquiry was ${status.toUpperCase()}.`,
    'reverse-hiring',
    '/candidate/reverse-hiring'
  );

  res.json({ success: true, data: request, message: `Request marked as ${status}.` });
});
