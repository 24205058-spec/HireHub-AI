const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, updateApplicationStatus, saveJob, getSavedJobs } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('candidate'), applyForJob);
router.get('/my', protect, authorize('candidate'), getMyApplications);
router.put('/:id/status', protect, authorize('recruiter', 'admin'), updateApplicationStatus);
router.post('/save', protect, authorize('candidate'), saveJob);
router.get('/saved', protect, authorize('candidate'), getSavedJobs);

module.exports = router;
