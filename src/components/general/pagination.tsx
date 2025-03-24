"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages = 30 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-bold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Page Numbers */}
      {[...Array(5)].map((_, index) => {
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
        const page = startPage + index;

        return (
          <div
            key={page}
            className={`w-5 flex items-center justify-center cursor-pointer p-2 px-4 rounded-lg text-xs text-neutral-700 ${
              currentPage === page ? "bg-primary-100 text-black" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        className={"cursor-pointer p-2 rounded-lg border-1 border-neutral-500"}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={15} />
      </button>
      <button
        className={"cursor-pointer p-2 rounded-lg border-1 border-neutral-500"}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

export default Pagination;
