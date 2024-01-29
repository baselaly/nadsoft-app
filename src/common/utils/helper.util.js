export const getTakeAndSkipPaginationOptions = (page, perPage) => {
  perPage = perPage || 10;
  const take = perPage;
  const skip = (page - 1) * perPage;
  return { take, skip };
};

export const getTotalPageNumbers = (rowsCount, perPage) => {
  return Math.floor((rowsCount + perPage - 1) / perPage);
};

