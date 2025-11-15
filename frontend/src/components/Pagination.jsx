import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 bg-gray-800 rounded-md text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 hover:text-gray-900"
      >
        <ChevronLeft size={20} />
        Previous
      </button>

      <span className="text-gray-300 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 bg-gray-800 rounded-md text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 hover:text-gray-900"
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;