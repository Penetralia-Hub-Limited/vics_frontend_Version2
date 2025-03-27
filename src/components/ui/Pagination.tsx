interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="px-3 py-1 bg-gray-300 rounded"
      >
        &lt;
      </button>
      {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page + 1)}
          className={`px-3 py-1 rounded ${currentPage === page + 1 ? "bg-green-500 text-white" : "bg-gray-300"}`}
        >
          {page + 1}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="px-3 py-1 bg-gray-300 rounded"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
