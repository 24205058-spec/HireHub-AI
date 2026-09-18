const Notification = require('../models/Notification');

const createNotification = async (userId, title, message, type = 'general', link = '') => {
  try {
    return await Notification.create({ userId, title, message, type, link });
  } catch (err) {
    console.error('Notification creation error:', err.message);
  }
};

const calculateProfileCompletion = (profile = {}) => {
  let score = 0;
  if (profile.headline) score += 10;
  if (profile.bio) score += 10;
  if (profile.phone) score += 5;
  if (profile.location) score += 5;
  if (profile.skills && profile.skills.length > 0) score += 20;
  if (profile.education && profile.education.length > 0) score += 15;
  if (profile.experience && profile.experience.length > 0) score += 15;
  if (profile.resumeUrl) score += 10;
  if (profile.github || profile.linkedin || profile.portfolio) score += 10;
  return Math.min(100, score);
};

module.exports = { createNotification, calculateProfileCompletion };
