import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>}
      {currentPage < totalPages && <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>}
    </div>
  );
};

export default Pagination;
