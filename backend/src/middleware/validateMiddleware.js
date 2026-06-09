const { validationResult } = require('express-validator');
const { sendError } = require('../utils/response');

/**
 * Middleware to check request validation results and return formatted errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format error array to make it clean
    const formattedErrors = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    return sendError(res, 'Validation failure', 400, formattedErrors);
  }
  next();
};

module.exports = validate;
