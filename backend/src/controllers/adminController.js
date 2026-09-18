const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const asyncHandler = require('../utils/asyncHandler');

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [users, candidates, recruiters, jobs, applications, interviews] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'candidate' }),
    User.countDocuments({ role: 'recruiter' }),
    Job.countDocuments(),
    Application.countDocuments(),
    Interview.countDocuments(),
  ]);

  const recentUsers = await User.find().sort({ createdAt: -1 }).limit(6).select('name email role createdAt isActive');
  const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(6).populate('recruiterId', 'name');

  res.json({
    success: true,
    data: { users, candidates, recruiters, jobs, applications, interviews, recentUsers, recentJobs },
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const { role, page = 1, limit = 20 } = req.query;
  const query = role ? { role } : {};
  const total = await User.countDocuments(query);
  const users = await User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
  res.json({ success: true, data: users, total });
});

exports.getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().populate('recruiterId', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, data: jobs });
});

exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User account not found.' });
  user.isActive = !user.isActive;
  await user.save();
  res.json({ success: true, data: user, message: `User status switched to ${user.isActive ? 'Active' : 'Suspended'}.` });
});

exports.renderReport = asyncHandler(async (req, res) => {
  const [totalUsers, candidates, recruiters, totalJobs, activeJobs, totalApplications, interviews] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'candidate' }),
    User.countDocuments({ role: 'recruiter' }),
    Job.countDocuments(),
    Job.countDocuments({ status: 'active' }),
    Application.countDocuments(),
    Interview.countDocuments(),
  ]);

  res.render('report', {
    totalUsers,
    candidates,
    recruiters,
    totalJobs,
    activeJobs,
    totalApplications,
    interviews,
    generatedAt: new Date().toLocaleString(),
  });
});
