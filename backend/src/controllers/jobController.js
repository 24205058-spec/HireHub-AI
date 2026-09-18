const Job = require('../models/Job');
const RecruiterProfile = require('../models/RecruiterProfile');
const Application = require('../models/Application');
const asyncHandler = require('../utils/asyncHandler');
const aiQuality = require('../services/ai/jobQualityAnalyzer');

exports.getJobs = asyncHandler(async (req, res) => {
  const { keyword, location, jobType, workMode, minSalary, maxSalary, skills, page = 1, limit = 10 } = req.query;
  const query = { status: 'active' };

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { skills: { $in: [new RegExp(keyword, 'i')] } }
    ];
  }
  if (location) query.location = { $regex: location, $options: 'i' };
  if (jobType) query.jobType = jobType;
  if (workMode) query.workMode = workMode;
  if (minSalary) query['salary.min'] = { $gte: Number(minSalary) };
  if (maxSalary) query['salary.max'] = { $lte: Number(maxSalary) };
  if (skills) {
    const skillArr = skills.split(',').map(s => s.trim());
    query.skills = { $in: skillArr.map(s => new RegExp(s, 'i')) };
  }

  const total = await Job.countDocuments(query);
  const jobs = await Job.find(query)
    .populate('recruiterId', 'name avatar email')
    .populate('companyId')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ success: true, data: jobs, total, page: Number(page), pages: Math.ceil(total / limit) || 1 });
});

exports.getJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('recruiterId', 'name avatar email').populate('companyId');

  if (!job) return res.status(404).json({ success: false, message: 'Job listing not found.' });
  res.json({ success: true, data: job });
});

exports.createJob = asyncHandler(async (req, res) => {
  const profile = await RecruiterProfile.findOne({ userId: req.user._id });
  const quality = aiQuality.analyzeJobQuality(req.body);

  const jobData = {
    ...req.body,
    recruiterId: req.user._id,
    companyId: profile?._id,
    qualityScore: quality.score
  };

  const job = await Job.create(jobData);
  res.status(201).json({ success: true, data: job, qualityAnalysis: quality });
});

exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, recruiterId: req.user._id });
  if (!job && req.user.role !== 'admin') {
    return res.status(404).json({ success: false, message: 'Job not found or access denied.' });
  }

  const quality = aiQuality.analyzeJobQuality(req.body);
  const updated = await Job.findByIdAndUpdate(
    req.params.id,
    { ...req.body, qualityScore: quality.score },
    { new: true, runValidators: true }
  );
  res.json({ success: true, data: updated, qualityAnalysis: quality });
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, recruiterId: req.user._id });
  if (!job && req.user.role !== 'admin') {
    return res.status(404).json({ success: false, message: 'Job not found or access denied.' });
  }

  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Job listing removed successfully.' });
});

exports.getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: jobs });
});

exports.getJobApplicants = asyncHandler(async (req, res) => {
  const applications = await Application.find({ jobId: req.params.id })
    .populate('candidateId', 'name email avatar')
    .sort({ matchScore: -1 });

  res.json({ success: true, data: applications });
});
