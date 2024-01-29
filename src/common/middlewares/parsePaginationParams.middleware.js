export default (req, res, next) => {
  let { page, perPage } = req.query;

  const defaultPage = 1;
  const defaultPerPage = 10;

  // Cast them or assign default values if they not assigned
  req.query.page = parseInt(page, 10) || defaultPage;
  req.query.perPage = parseInt(perPage, 10) || defaultPerPage;

  next();
};

