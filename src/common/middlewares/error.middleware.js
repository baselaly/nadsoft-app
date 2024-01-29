export default (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.errors || err.message || "something went wrong!",
    timeStamp: new Date().toISOString(),
    url: req.url,
  });
};

