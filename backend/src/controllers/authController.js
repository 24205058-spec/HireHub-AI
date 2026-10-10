const User = require('../models/User');
const CandidateProfile = require('../models/CandidateProfile');
const RecruiterProfile = require('../models/RecruiterProfile');
const { generateToken } = require('../config/jwt');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role, companyName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered in system.' });
  }

  const user = await User.create({ name, email, password, role: role || 'candidate' });

  if (user.role === 'candidate') {
    await CandidateProfile.create({
      userId: user._id,
      currentRole: '',
      profileCompletion: 0,
      resumeScore: 0
    });
  } else if (user.role === 'recruiter') {
    await RecruiterProfile.create({ userId: user._id, companyName: companyName || 'Hiring Enterprise' });
  }

  const token = generateToken({ id: user._id, role: user.role });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { user, token },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = generateToken({ id: user._id, role: user.role });
  const userObj = user.toJSON();

  let profile = null;
  if (user.role === 'candidate') {
    profile = await CandidateProfile.findOne({ userId: user._id });
  } else if (user.role === 'recruiter') {
    profile = await RecruiterProfile.findOne({ userId: user._id });
  }

  res.json({
    success: true,
    message: 'Welcome back to HireHub AI',
    data: { user: userObj, token, profile },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  let profile = null;

  if (user.role === 'candidate') {
    profile = await CandidateProfile.findOne({ userId: user._id });
  } else if (user.role === 'recruiter') {
    profile = await RecruiterProfile.findOne({ userId: user._id });
  }

  res.json({ success: true, data: { user, profile } });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true });
  res.json({ success: true, data: user });
});
