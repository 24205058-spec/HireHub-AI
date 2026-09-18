const Application = require('../models/Application');
const Job = require('../models/Job');
const SavedJob = require('../models/SavedJob');
const CandidateProfile = require('../models/CandidateProfile');
const asyncHandler = require('../utils/asyncHandler');
const { createNotification } = require('../utils/helpers');
const jobMatcher = require('../services/ai/jobMatcher');

exports.applyForJob = asyncHandler(async (req, res) => {
  const { jobId, coverLetter, resume } = req.body;

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job listing not found.' });

  const existing = await Application.findOne({ candidateId: req.user._id, jobId });
  if (existing) return res.status(400).json({ success: false, message: 'Application already active for this position.' });

  const profile = await CandidateProfile.findOne({ userId: req.user._id });
  let matchScore = 75;
  if (profile) {
    const match = jobMatcher.calculateMatch(profile, job);
    matchScore = match.overallScore;
  }

  const application = await Application.create({
    candidateId: req.user._id,
    jobId,
    recruiterId: job.recruiterId,
    coverLetter: coverLetter || '',
    resume: resume || profile?.resumeUrl || '',
    matchScore,
    statusHistory: [{ status: 'applied', changedAt: new Date(), note: 'Submitted application' }],
  });

  await Job.findByIdAndUpdate(jobId, { $inc: { applicationCount: 1 } });

  await createNotification(
    job.recruiterId,
    'New Candidate Application',
    `${req.user.name} submitted an application for ${job.title} (${matchScore}% match).`,
    'application',
    `/recruiter/applicants`
  );

  res.status(201).json({ success: true, data: application, message: 'Application submitted successfully.' });
});

exports.getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ candidateId: req.user._id })
    .populate({
      path: 'jobId',
      populate: { path: 'companyId' }
    })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: applications });
});

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  const application = await Application.findById(req.params.id)
    .populate('jobId')
    .populate('candidateId', 'name email');

  if (!application) return res.status(404).json({ success: false, message: 'Application not found.' });

  const isOwnerRecruiter = application.recruiterId.toString() === req.user._id.toString();
  if (!isOwnerRecruiter && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  application.status = status;
  application.statusHistory.push({ status, changedAt: new Date(), note: note || `Status changed to ${status}` });
  application.updatedAt = new Date();
  await application.save();

  await createNotification(
    application.candidateId._id,
    'Application Status Updated',
    `Your candidacy for ${application.jobId ? application.jobId.title : 'the position'} is now '${status.toUpperCase()}'.`,
    'status-change',
    '/candidate/applications'
  );

  res.json({ success: true, data: application, message: 'Application status updated successfully.' });
});

exports.saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const exists = await SavedJob.findOne({ candidateId: req.user._id, jobId });
  if (exists) {
    await SavedJob.findByIdAndDelete(exists._id);
    return res.json({ success: true, saved: false, message: 'Removed from saved jobs.' });
  }
  await SavedJob.create({ candidateId: req.user._id, jobId });
  res.json({ success: true, saved: true, message: 'Job bookmarked successfully.' });
});

exports.getSavedJobs = asyncHandler(async (req, res) => {
  const saved = await SavedJob.find({ candidateId: req.user._id })
    .populate({
      path: 'jobId',
      populate: { path: 'companyId' }
    })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: saved });
});
