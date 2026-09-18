const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(40);
  const unreadCount = await Notification.countDocuments({ userId: req.user._id, read: false });
  res.json({ success: true, data: notifications, unreadCount });
});

exports.markAsRead = asyncHandler(async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ success: true, message: 'Marked as read.' });
});

exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user._id, read: false }, { read: true });
  res.json({ success: true, message: 'All notifications marked as read.' });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Notification removed.' });
});
