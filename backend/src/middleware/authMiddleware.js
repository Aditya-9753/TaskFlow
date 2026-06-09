const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/response');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_123456');

      // Get user from database (omit password) and attach to req.user
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return sendError(res, 'User no longer exists', 401);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('JWT Verification error:', error.message);
      return sendError(res, 'Not authorized, token failed', 401);
    }
  }

  if (!token) {
    return sendError(res, 'Not authorized, no token provided', 401);
  }
};

module.exports = { protect };
