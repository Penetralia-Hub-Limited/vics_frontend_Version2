"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages = 30 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-neutral-700 font-bold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Page Numbers */}
      {[...Array(5)].map((_, index) => {
        const page = index + 1;
        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "pagination"}
            className={`text-xs text-neutral-700 ${currentPage === page ? "bg-primary-100 text-black" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}

      {/* Navigation Buttons */}
      <Button
        className={"border-neutral-700"}
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={15} />
      </Button>
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={15} />
      </Button>
    </div>
  );
};

export default Pagination;
