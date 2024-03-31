import { useState } from "react";

const usePagination = (itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateItems = (items) => {
    // Calculate index range for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = items
      ? Math.min(startIndex + itemsPerPage, items.length)
      : 0;
    // Slice items array to get items for current page
    const currentItems = items ? items.slice(startIndex, endIndex) : [];

    return currentItems;
  };

  const getTotalPages = (items) => {
    // Calculate total number of pages
    const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;
    return totalPages;
  };

  return {
    currentPage,
    getTotalPages,
    handlePageChange,
    paginateItems,
  };
};

export default usePagination;
