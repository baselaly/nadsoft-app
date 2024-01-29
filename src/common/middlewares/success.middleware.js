export default (req, res, next) => {
  res.sendSuccess = ({ message = "success", statusCode = 200, data = [] }) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  next();
};

