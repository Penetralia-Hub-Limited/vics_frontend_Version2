"use client";

import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-bold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Navigation Buttons */}
      <button
        className="cursor-pointer p-2 rounded-lg border border-neutral-500"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={15} />
      </button>

      {/* Page Numbers (show max 5 pages) */}
      {Array.from({ length: totalPages })
        .slice(
          Math.max(0, currentPage - 3),
          Math.min(totalPages, currentPage + 2)
        )
        .map((_, index) => {
          const page = Math.max(1, currentPage - 2) + index;
          return (
            <div
              key={page}
              className={`w-5 h-5 flex items-center justify-center cursor-pointer p-4 rounded-md text-xs text-neutral-700 ${
                currentPage === page ? "bg-primary-100 text-black" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
          );
        })}

      <button
        className="cursor-pointer p-2 rounded-lg border border-neutral-500"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

export default Pagination;
