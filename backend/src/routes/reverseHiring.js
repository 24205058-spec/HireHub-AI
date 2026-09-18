const express = require('express');
const router = express.Router();
const { getAllCompanies, createRequest, getMyRequests, getRecruiterRequests, updateRequestStatus } = require('../controllers/reverseHiringController');
const { protect, authorize } = require('../middleware/auth');

router.get('/companies', getAllCompanies);
router.post('/', protect, authorize('candidate'), createRequest);
router.get('/my-requests', protect, authorize('candidate'), getMyRequests);
router.get('/recruiter-requests', protect, authorize('recruiter'), getRecruiterRequests);
router.put('/:id', protect, authorize('recruiter'), updateRequestStatus);

module.exports = router;
