const { sendError } = require('../utils/response');

/**
 * Custom error handler to catch and format database/validation/JWT/server errors
 */
const errorHandler = (err, req, res, next) => {
  // Log error stack to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error Stack:', err.stack);
  } else {
    console.error('Error Message:', err.message);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  // Handle Mongoose duplicate key error (e.g. Email duplication)
  if (err.code === 11000) {
    statusCode = 400;
    const duplicatedField = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${duplicatedField}`;
    errors = [{
      field: duplicatedField,
      message: `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} is already registered`
    }];
  }

  // Handle Mongoose Cast Error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with id of ${err.value}`;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
  }

  // Handle JWT invalid signature
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Not authorized, invalid token signature';
  }

  // Handle JWT expired token
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized, token has expired';
  }

  sendError(res, message, statusCode, errors);
};

/**
 * Route Not Found middleware (Fallback 404 handler)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};
