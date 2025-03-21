import { Movie } from "../models/movie";
import { FaImdb } from "react-icons/fa";

export default function MovieCard({ data }: { data: Movie }) {
  return (
    <div className="border border-gray-300 rounded-md flex flex-col group">
      <div className="flex justify-center items-center pr-2 my-2">
        <span className="flex items-center gap-1 p-1 text-sm text-black">
          <FaImdb className="text-3xl text-yellow-400 bg-black rounded-md" />
          {data.imdbID}
        </span>
      </div>

      <a href={`/movie/${data.imdbID}`}>
        <div className="relative w-full aspect-[1.2/2] overflow-hidden cursor-pointer">
          <img
            src={data.Poster}
            alt={data.Title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300 transition-all"
          />
        </div>
        <div className="flex items-center justify-between px-1 py-1 border-t-4 border-yellow-400">
          <div className="flex items-center text-sm capitalize gap-1">
            <p className="font-bold">Type:</p>
            <p className="italic">{data.Type}</p>
          </div>
          <p className="text-sm">{data.Year}</p>
        </div>

        <div className="min-h-[90px] max-h-fit flex items-center justify-center text-center px-1 border-t-4 border-yellow-400 cursor-pointer">
          <p className="flex text-lg text-gray-700 group-hover:underline font-bold line-clamp-3">
            {data.Title}
          </p>
        </div>
      </a>
    </div>
  );
}
