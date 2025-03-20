import { Movie } from "../models/movie";
import { FaImdb } from "react-icons/fa";

export default function MovieCard({ data }: { data: Movie }) {
  return (
    <div className="border border-gray-300 rounded-md flex flex-col group">
      <div className="flex justify-between items-center pr-2">
        <span className="flex items-center gap-1 p-1 rounded-sm text-xs bg-yellow-300 text-black shadow-xl">
          <FaImdb className="text-2xl" />
          {data.imdbID}
        </span>
        <p className="text-sm">{data.Year}</p>
      </div>

      <a href={`/movie/${data.imdbID}`}>
        <div className="relative w-full aspect-[1.2/2] overflow-hidden cursor-pointer">
          <img
            src={data.Poster}
            alt={data.Title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300 transition-all"
          />
        </div>

        <div className="min-h-[70px] max-h-fit flex items-center justify-center text-center px-1 border-t-4 border-yellow-400 cursor-pointer">
          <p className="flex text-sm text-black group-hover:underline">
            {data.Title}
          </p>
        </div>
      </a>
    </div>
  );
}
