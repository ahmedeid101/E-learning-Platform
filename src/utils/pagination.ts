export const applyPagination = (query: any, page = 1, limit = 10) => {
  return query.skip((page - 1) * limit).limit(limit);
};