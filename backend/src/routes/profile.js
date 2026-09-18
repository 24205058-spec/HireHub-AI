const express = require('express');
const router = express.Router();
const { getCandidateProfile, updateCandidateProfile, uploadResume, getRecruiterProfile, updateRecruiterProfile, getAllCandidates } = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/candidate', protect, authorize('candidate'), getCandidateProfile);
router.get('/candidate/:userId', getCandidateProfile);
router.put('/candidate', protect, authorize('candidate'), updateCandidateProfile);
router.post('/candidate/resume', protect, authorize('candidate'), upload.single('resume'), uploadResume);

router.get('/recruiter', protect, authorize('recruiter'), getRecruiterProfile);
router.get('/recruiter/:userId', getRecruiterProfile);
router.put('/recruiter', protect, authorize('recruiter'), updateRecruiterProfile);

router.get('/candidates', protect, authorize('recruiter', 'admin'), getAllCandidates);

module.exports = router;
