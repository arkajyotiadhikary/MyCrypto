import React from "react";

interface PaginationProps {
      currentPage: number;
      totalPages: number;
      onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
      const renderPageNumbers = () => {
            const pages = [];
            for (let i = 1; i <= totalPages; i++) {
                  pages.push(
                        <li key={i}>
                              <button
                                    className={`flex items-center justify-center px-3 h-10 leading-tight text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 shadow-sm ${
                                          currentPage === i ? "bg-gray-700 dark:bg-gray-800" : ""
                                    }`}
                                    onClick={() => onPageChange(i)}
                              >
                                    {i}
                              </button>
                        </li>
                  );
            }
            return pages;
      };

      return (
            <nav aria-label="Page navigation">
                  <ul className="inline-flex -space-x-px text-sm">
                        <li>
                              <button
                                    className={`flex items-center justify-center px-3 h-10 ms-0 leading-tight text-white bg-gray-800 border border-e-0 border-gray-700 rounded-s-lg hover:bg-gray-700 hover:text-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 shadow-sm ${
                                          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                              >
                                    Previous
                              </button>
                        </li>
                        {renderPageNumbers()}
                        <li>
                              <button
                                    className={`flex items-center justify-center px-3 h-10 leading-tight text-white bg-gray-800 border border-gray-700 rounded-e-lg hover:bg-gray-700 hover:text-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 shadow-sm ${
                                          currentPage === totalPages
                                                ? "cursor-not-allowed opacity-50"
                                                : ""
                                    }`}
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                              >
                                    Next
                              </button>
                        </li>
                  </ul>
            </nav>
      );
};

export default Pagination;
