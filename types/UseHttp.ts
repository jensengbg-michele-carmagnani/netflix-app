import { Movie } from "./Movie";
import { Cast } from "./MovieCast";

export interface Https {
  url: string;
  fetchUrl:string;
  getMovies: (arg: Movie) => Movie[];
  getActor: (arg: Cast) => Cast;
 
}
export interface HttpsRes{
  error: Error;
  isLoading: boolean;
  sendRequest: ()=> void
}
