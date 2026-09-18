const express = require('express');
const router = express.Router();
const { getJobs, getJob, createJob, updateJob, deleteJob, getMyJobs, getJobApplicants } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/my-jobs', protect, authorize('recruiter'), getMyJobs);
router.get('/:id', getJob);
router.get('/:id/applicants', protect, authorize('recruiter', 'admin'), getJobApplicants);
router.post('/', protect, authorize('recruiter'), createJob);
router.put('/:id', protect, authorize('recruiter', 'admin'), updateJob);
router.delete('/:id', protect, authorize('recruiter', 'admin'), deleteJob);

module.exports = router;
