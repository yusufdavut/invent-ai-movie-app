import { Movie, MovieDetail } from "../models/movie";
import { searchByMovieName } from "../api/movies";

interface FilterAreaProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredData: React.Dispatch<
    React.SetStateAction<Movie[] | MovieDetail[]>
  >;
  setTotalResults: React.Dispatch<React.SetStateAction<number>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchText: string;
  selectedYear: string;
  selectedType: string;
}

export default function FilterArea({
  setFilteredData,
  setSuccess,
  setTotalResults,
  setSearchText,
  setSelectedYear,
  setSelectedType,
  setCurrentPage,
  searchText,
  selectedYear,
  selectedType,
}: FilterAreaProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    const result = await searchByMovieName(
      searchText,
      selectedYear,
      selectedType
    );

    if (!result || result.movies.length === 0) {
      setSuccess(false);
    } else {
      setFilteredData(result.movies);
      setTotalResults(result.totalResults);
      setSuccess(true);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <input
          className="border border-gray-300 px-2 py-1 bg-transparent outline-none rounded w-[120px] sm:w-full"
          type="text"
          name="search"
          id="search"
          placeholder="Search Movie"
          value={searchText}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <select
            className="border border-gray-300 px-2 py-1 bg-transparent outline-none rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {[...Array(new Date().getFullYear() - 1799)].map((_, index) => {
              const year = new Date().getFullYear() - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>

          <select
            className="border border-gray-300 px-2 py-1 bg-transparent outline-none rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="game">Game</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="bg-yellow-400 w-fit px-2 py-1 rounded hover:opacity-85"
        >
          Search
        </button>
      </div>
    </div>
  );
}
