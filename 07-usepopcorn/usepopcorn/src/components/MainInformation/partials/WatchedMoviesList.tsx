import type { watchedProps } from "@/types";
import { WatchedMovie } from "./WatchedMovie";

export const WatchedMoviesList = ({ watched }: watchedProps) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
