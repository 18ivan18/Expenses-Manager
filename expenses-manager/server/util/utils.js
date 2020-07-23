exports.error = (req, res, statusCode, message, err) => {
  res.status(statusCode || 500).json({
    message: message || err.message,
    error: err || {},
    success: false
  });
};
