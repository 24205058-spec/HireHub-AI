const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getAllJobs, toggleUserStatus, renderReport } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/stats', protect, authorize('admin'), getDashboardStats);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/jobs', protect, authorize('admin'), getAllJobs);
router.put('/users/:id/toggle', protect, authorize('admin'), toggleUserStatus);
router.get('/reports', renderReport);

module.exports = router;
