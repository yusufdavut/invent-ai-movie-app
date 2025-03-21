import { useCallback, useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { fetchData } from "../api/movies";
import FilterArea from "../components/FilterArea";
import MovieCard from "../components/MovieCard";
import debounce from "lodash.debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

export default function Home() {
  const [data, setData] = useState<Movie[]>();
  const [filteredData, setFilteredData] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageFromUrl = Number(searchParams.get("Page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const [searchText, setSearchText] = useState<string>("Pokemon");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const fetchMovies = useCallback(
    debounce(async () => {
      setLoading(true);
      const result = await fetchData();
      setData(result?.movies || []);
      setTotalResults(result?.totalResults || 0);
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const updateUrl = (newPage: number) => {
    navigate(`?Page=${newPage}`, { replace: true });
  };

  const currentData = filteredData?.length > 0 ? filteredData : data;

  return (
    <main className="py-10 px-6 2xl:px-0">
      <div className="container">
        <h1 className="text-5xl uppercase mb-6">MOVIES</h1>
        <FilterArea
          setFilteredData={setFilteredData}
          setSuccess={setSuccess}
          setTotalResults={setTotalResults}
          setSearchText={setSearchText}
          setSelectedYear={setSelectedYear}
          setSelectedType={setSelectedType}
          setCurrentPage={setCurrentPage}
          searchText={searchText}
          selectedYear={selectedYear}
          selectedType={selectedType}
        />
        {loading && <LoadingSpinner />}
        {!success && <p>The film you are looking for was not found</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6">
          {success &&
            currentData?.map((item, index) => (
              <div key={index}>
                <MovieCard data={item} />
              </div>
            ))}
        </div>

        <Pagination
          totalResults={totalResults}
          currentPage={currentPage}
          setCurrentPage={(page) => {
            setCurrentPage((prev) => {
              const newPage = typeof page === "function" ? page(prev) : page;
              updateUrl(newPage);
              return newPage;
            });
          }}
          searchText={searchText}
          selectedYear={selectedYear}
          selectedType={selectedType}
          setFilteredData={setFilteredData}
          setTotalResults={setTotalResults}
        />
      </div>
    </main>
  );
}
