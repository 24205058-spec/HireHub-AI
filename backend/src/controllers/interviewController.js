const Interview = require('../models/Interview');
const asyncHandler = require('../utils/asyncHandler');
const { createNotification } = require('../utils/helpers');

exports.scheduleInterview = asyncHandler(async (req, res) => {
  const { candidateId, jobId, applicationId, date, time, meetingLink, notes, type } = req.body;

  const interview = await Interview.create({
    candidateId,
    recruiterId: req.user._id,
    jobId,
    applicationId,
    date,
    time,
    meetingLink: meetingLink || 'https://meet.google.com/hirehub-ai-room',
    notes: notes || 'Technical & cultural screening',
    type: type || 'technical',
    status: 'scheduled',
  });

  await createNotification(
    candidateId,
    'Interview Confirmed',
    `An interview has been scheduled for ${date} at ${time}.`,
    'interview',
    '/candidate/interviews'
  );

  res.status(201).json({ success: true, data: interview, message: 'Interview scheduled successfully.' });
});

exports.getMyInterviews = asyncHandler(async (req, res) => {
  const query = req.user.role === 'candidate'
    ? { candidateId: req.user._id }
    : { recruiterId: req.user._id };

  const interviews = await Interview.find(query)
    .populate('candidateId', 'name avatar email')
    .populate('recruiterId', 'name avatar email')
    .populate('jobId', 'title location workMode')
    .sort({ date: 1 });

  res.json({ success: true, data: interviews });
});

exports.updateInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: interview, message: 'Interview updated.' });
});
