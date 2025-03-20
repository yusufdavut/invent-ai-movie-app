import { Movie } from "../models/movie";

interface FilterAreaProps {
  setFilteredData: React.Dispatch<React.SetStateAction<Movie[]>>;
}
export default function FilterArea({ setFilteredData }: FilterAreaProps) {
  const handleSearch = () => {
    const filtered: Movie[] = [];
    setFilteredData(filtered);
  };

  return (
    <div>
      <button onClick={handleSearch}>abc</button>
    </div>
  );
}
