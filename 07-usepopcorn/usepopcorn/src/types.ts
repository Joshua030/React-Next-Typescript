import type { ReactNode } from "react";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
}

// MovieCompleted: All fields in Movie, but required
export type MovieCompleted = Required<Movie>;

// MovieFiltered: Only imdbRating
export type MovieFiltered = Pick<Required<Movie>, "imdbRating">;

// Props interfaces
// export interface NavBarProps {
//   movies: Movie[];
//   children: ReactNode | ReactNode[];
// }

export interface MainInformationProps {
  movies: Movie[];
  watched: MovieCompleted[];
}

export interface BasicPageProps {
  children: ReactNode | ReactNode[];
}

export interface watchedProps {
  watched: MovieCompleted[];
}
