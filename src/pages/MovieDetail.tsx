import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchByImdbId } from "../api/movies";
import type { MovieDetail } from "../models/movie";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaImdb } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetailData = async () => {
      setLoading(true);
      const data = await fetchByImdbId(id!);

      if (!data || data.Response === "False") {
        navigate("/404", { replace: true });
      } else {
        setMovie(data);
      }

      setLoading(false);
    };

    getDetailData();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-10">
      <div
        className="mb-10 cursor-pointer flex justify-center sm:justify-start items-center gap-1 group w-full sm:w-fit"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackCircle className="text-6xl group-hover:text-yellow-400 transition-all duration-300" />
        <p className="text-3xl font-bold group-hover:text-yellow-400 transition-all duration-300">
          Back
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 px-6 xm:px-0">
        <div className="col-span-1 sm:col-span-4 relative w-full aspect-[0.7/1] overflow-hidden border border-gray-300">
          <img
            src={movie?.Poster}
            alt={movie?.Title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 sm:col-span-8 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FaImdb className="text-6xl text-yellow-400 bg-black rounded-md" />
            <p className="text-5xl font-light">{movie?.imdbRating}</p>
          </div>
          <h1 className="text-5xl font-bold">{movie?.Title}</h1>
          <p className="text-lg font-light italic">{movie?.Plot}</p>
          <div>
            <p className="text-2xl gap-1 flex items-center capitalize">
              <span className="font-extrabold text-yellow-700">Type:</span>
              {movie?.Type}
            </p>
          </div>
          <div className="text-2xl gap-1 flex items-center capitalize border-b border-gray-200 pb-4">
            <p className="font-extrabold text-yellow-700">Actors:</p>
            <p>{movie?.Actors}</p>
          </div>
          <div className="text-2xl gap-1 flex flex-col items-center capitalize">
            <p className="font-extrabold text-yellow-700">Writers</p>
            <p>{movie?.Writer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
