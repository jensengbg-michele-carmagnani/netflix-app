export const API_KEY = "ee50a1e0d06151144fff8f5e7363f16e";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopReted: `movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchCommedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchRomaticMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTvseriesAction: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=10759`,
  fetchTvseriesAnimation: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=16`,
  fetchTvseriesFantasy: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=10765`,
  fetchTvseriesCommedy: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=35`,
  fetchTvseriesCrime: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=80`,
  fetchTvseriesSoap: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=10766`,
  fetchTvseriesWestern: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=37`,
  fetchTvseriesDrama: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=18`,
  fetchTvseriesWarPolitics: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=10768`,
  fetchTvseriesTopten: `discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  fetchFilmsFamily: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=10751`,
  fetchFilmsAnimation: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=16`,
  fetchFilmsFantasy: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=10765`,
  fetchFilmsCrime: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=80`,
  fetchFilmsWestern: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=37`,
  fetchFilmsDrama: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=18`,
  fetchFilmsDocumentaries: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=99`,
  fetchFilmsTopten: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate`,
  fetchTrendyOfWeekAll: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTrendyOfDayTv: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  fetchTrendyOfdayMovie: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  fetchTrendyOfdayPerson: `/trending/person/day?api_key=${API_KEY}&language=en-US`,
  base_url_img: "https://image.tmdb.org/t/p/original",
  fetchGenre: `genre/tv/list?api_key=${API_KEY}&language=en-US`,
};
//https://api.themoviedb.org/3/trending/movie/day?api_key=ee50a1e0d06151144fff8f5e7363f16e&language=en-US`,
//https://api.themoviedb.org/3/person/62?api_key=ee50a1e0d06151144fff8f5e7363f16e&language=en-US
//https://api.themoviedb.org/3/movie/976?api_key=ee50a1e0d06151144fff8f5e7363f16e&append_to_response=videos
//movie credits
//https://api.themoviedb.org/3/person/1100/movie_credits?api_key=ee50a1e0d06151144fff8f5e7363f16e&language=en-US
//https://api.themoviedb.org/3/person/1100/tv_credits?api_key=ee50a1e0d06151144fff8f5e7363f16e&language=en-US
export default requests;
