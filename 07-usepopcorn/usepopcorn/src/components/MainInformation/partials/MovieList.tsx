import type { Movie as MovieType } from "@/types";
import { Movie } from "./Movie";

interface MovieList {
  movies: MovieType[];
}

export const MovieList = ({ movies }: MovieList) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
