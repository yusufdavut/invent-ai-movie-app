import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { fetchData } from "../api/movies";
import FilterArea from "../components/FilterArea";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [data, setData] = useState<Movie[]>();
  const [filteredData, setFilteredData] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result.Search);
    };

    getData();
  }, []);

  const finalData = filteredData?.length > 0 ? filteredData : data;

  return (
    <main className="py-10">
      <div className="container">
        <h1 className="text-5xl uppercase mb-6">MOVIES</h1>
        <FilterArea setFilteredData={setFilteredData} />
        <div className="grid grid-cols-5 gap-6 mb-6">
          {finalData?.map((item, index) => (
            <div key={index}>
              <MovieCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
