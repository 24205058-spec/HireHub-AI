const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  validate,
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required.'),
  body('password').notEmpty().withMessage('Password required.'),
  validate,
], login);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
