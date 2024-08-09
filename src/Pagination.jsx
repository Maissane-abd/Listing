import React from 'react';
import { useGlobalContext } from './context';

const Pagination = () => {
  const { currentPage, itemsPerPage, filteredMovies, setCurrentPage, handleItemsPerPageChange } = useGlobalContext();

  const pageNumbers = [];
  if (filteredMovies && filteredMovies.length > 0) {
    for (let i = 1; i <= Math.ceil(filteredMovies.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pagination">
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value={4}>4 per page</option>
        <option value={8}>8 per page</option>
        <option value={12}>12 per page</option>
      </select>

      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? 'active' : ''}
        >
          {number}
        </button>
      ))}

      <button onClick={handleNextPage} disabled={currentPage === pageNumbers.length}>Next</button>
    </div>
  );
};

export default Pagination;

