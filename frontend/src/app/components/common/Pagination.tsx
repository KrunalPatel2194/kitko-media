interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  }
  
  export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange
  }) => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600 order-2 sm:order-1">
          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalItems)} of {totalItems} results
        </p>
        <div className="flex flex-wrap justify-center gap-1 order-1 sm:order-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            const isVisible = window.innerWidth >= 640 || 
                            Math.abs(pageNumber - currentPage) <= 1 || 
                            pageNumber === 1 || 
                            pageNumber === totalPages;
  
            if (!isVisible) return null;
            
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`w-8 h-8 rounded-md ${
                  currentPage === pageNumber 
                    ? 'bg-[#AE8766] text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    );
  };