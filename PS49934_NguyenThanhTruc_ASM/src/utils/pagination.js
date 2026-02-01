export const getPaginationRange = (page, itemsPerPage = 12) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;
  return { start, end };
}