import React from "react";
import { Pagination } from "react-bootstrap";

export const PaginationTable = ({ currentPage, totalPages, goToPage }) => {
  return (
    <>
      <Pagination>
        <Pagination.First
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        />

        {currentPage - 2 > 0 && (
          <Pagination.Item onClick={() => goToPage(currentPage - 2)}>
            {currentPage - 2}
          </Pagination.Item>
        )}
        {currentPage - 1 > 0 && (
          <Pagination.Item onClick={() => goToPage(currentPage - 1)}>
            {currentPage - 1}
          </Pagination.Item>
        )}

        <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage + 1 <= totalPages && (
          <Pagination.Item onClick={() => goToPage(currentPage + 1)}>
            {currentPage + 1}
          </Pagination.Item>
        )}

        {currentPage + 2 <= totalPages && (
          <Pagination.Item onClick={() => goToPage(currentPage + 2)}>
            {currentPage + 2}
          </Pagination.Item>
        )}

        <Pagination.Last
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};
