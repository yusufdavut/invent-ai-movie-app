import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchByImdbId } from "../api/movies";
import type { MovieDetail } from "../models/movie";

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

  console.log({ movie });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="flex">
        <div>
          <img src={movie?.Poster} alt="" />
        </div>
      </div>
    </div>
  );
}
