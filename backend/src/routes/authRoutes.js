const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { registerRules, loginRules } = require('../validations/authValidation');
const validate = require('../middleware/validateMiddleware');

// Auth routes
router.post('/register', registerRules, validate, registerUser);
router.post('/login', loginRules, validate, loginUser);

module.exports = router;
