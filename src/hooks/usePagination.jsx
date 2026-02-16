import { useState, useEffect } from "react";

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
  };

  useEffect(() => {
    const totalPagesCount = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, [data, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const currentItems = data.slice(startIndex, endIndex).map((item, index) => ({
    ...item,
    globalIndex: startIndex + index + 1,
  }));

  return {
    currentPage,
    totalPages,
    goToPage,
    currentItems,
  };
};
