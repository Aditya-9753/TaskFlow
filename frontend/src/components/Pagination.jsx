import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination navigation controls for the task table/grid
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  limit,
  onPageChange,
}) => {
  // If no pages or only 1 page, don't show pagination
  if (totalPages <= 1) return null;

  // Calculate items showing
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalRecords);

  // Generate page numbers to render
  const getPageNumbers = () => {
    const pages = [];
    // Show all pages if under 7
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic for larger page sizes with ellipsis
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 py-3 bg-transparent transition-theme">
      
      {/* Range Display Text */}
      <div className="text-sm text-light-text-muted dark:text-dark-text-muted">
        Showing{' '}
        <span className="font-semibold text-light-text-main dark:text-dark-text-main">
          {startItem}
        </span>{' '}
        to{' '}
        <span className="font-semibold text-light-text-main dark:text-dark-text-main">
          {endItem}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-light-text-main dark:text-dark-text-main">
          {totalRecords}
        </span>{' '}
        records
      </div>

      {/* Page Number Selectors */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-light-border dark:border-dark-border text-light-text-muted dark:text-dark-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Buttons */}
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1.5 text-sm text-light-text-muted dark:text-dark-text-muted"
              >
                ...
              </span>
            );
          }

          const isActive = pageNum === currentPage;
          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg border transition ${
                isActive
                  ? 'bg-brand-primary border-brand-primary text-white shadow-sm'
                  : 'bg-white dark:bg-dark-card border-light-border dark:border-dark-border text-light-text-muted hover:text-light-text-main dark:text-dark-text-muted dark:hover:text-dark-text-main hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-light-border dark:border-dark-border text-light-text-muted dark:text-dark-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default Pagination;
