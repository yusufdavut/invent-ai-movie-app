import { useCallback, useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { fetchData } from "../api/movies";
import FilterArea from "../components/FilterArea";
import MovieCard from "../components/MovieCard";
//import Pagination from "../components/Pagination";
import debounce from "lodash.debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

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

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const fetchMovies = useCallback(
    debounce(async (page: number) => {
      setLoading(true);
      const result = await fetchData(page);
      setData(result?.movies || []);
      setTotalResults(result?.totalResults || 0);
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  const updateUrl = (newPage: number) => {
    navigate(`?Page=${newPage}`, { replace: true });
  };

  const itemsPerPage = 10;

  const currentData =
    filteredData?.length > 0
      ? filteredData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : data;

  const totalPages = totalResults / itemsPerPage;
  console.log({ totalPages });

  useEffect(() => {
    if (filteredData) {
      setCurrentPage(1);
      updateUrl(1);
    }
  }, [filteredData]);

  console.log({ currentData });

  return (
    <main className="py-10 px-6 2xl:px-0">
      <div className="container">
        <h1 className="text-5xl uppercase mb-6">MOVIES</h1>
        <FilterArea
          setFilteredData={setFilteredData}
          setSuccess={setSuccess}
          setTotalResults={setTotalResults}
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

        {/* <Pagination /> */}
      </div>
    </main>
  );
}
