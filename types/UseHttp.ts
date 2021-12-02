import { Movie } from "./Movie";
import { Cast } from "./MovieCast";

export interface Https {
  url: string;
  fetchUrl:string;
  getMovies: (arg: Movie) => Movie[];
  getActor: (arg: Cast) => Cast;
  error: Error;
  isLoading: boolean;
  sendRequest: ()=> void
}
