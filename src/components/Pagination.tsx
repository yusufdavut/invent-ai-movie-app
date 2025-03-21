import { searchByMovieName } from "../api/movies";
import { MovieDetail } from "../models/movie";

interface PaginationProps {
  totalResults: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFilteredData: React.Dispatch<React.SetStateAction<MovieDetail[]>>;
  setTotalResults: React.Dispatch<React.SetStateAction<number>>;
  searchText: string;
  selectedYear: string;
  selectedType: string;
}

export default function Pagination({
  totalResults,
  currentPage,
  setCurrentPage,
  setFilteredData,
  setTotalResults,
  searchText,
  selectedYear,
  selectedType,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);

    const result = await searchByMovieName(
      searchText,
      selectedYear,
      selectedType,
      newPage
    );

    if (result) {
      setFilteredData(result.movies);
      setTotalResults(result.totalResults);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-yellow-400 rounded disabled:opacity-50 hover:opacity-85"
      >
        Prev
      </button>
      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-yellow-400 rounded hover:opacity-85"
      >
        Next
      </button>
    </div>
  );
}
