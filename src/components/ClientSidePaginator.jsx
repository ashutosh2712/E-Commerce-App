import React from "react";

const ClientSidePaginator = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="pagination">
      <button
        className="btn-register"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          className="paginationBtn"
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        className="btn-register"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ClientSidePaginator;
