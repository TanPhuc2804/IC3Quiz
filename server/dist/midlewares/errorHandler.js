"use strict";

var errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = err.statusCode || 500;
  var message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
module.exports = {
  errorHandler: errorHandler
};