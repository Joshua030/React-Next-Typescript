import type { Movie } from "@/types";

interface movieResultsProps {
  movies: Movie[];
}

export const NumResult: React.FC<movieResultsProps> = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
