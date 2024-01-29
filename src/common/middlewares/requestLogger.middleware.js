export default (req, res, next) => {
  console.log({
    url: req.url,
    method: req.method,
    ip: req.ip,
    timeStamp: new Date().toISOString(),
  });

  next();
};

