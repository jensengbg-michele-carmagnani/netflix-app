import React,{useEffect, useState} from "react";
import css from "./Banner.module.css";
import axios from "../../lib/axios";
import requests from "../../lib/Requests";

const Banner = () => {
  const [movie, setMovie] = useState([])
  const troncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(requests.fetchActionMovies)
      setMovie(response.data.results[
        Math.floor(Math.random() * response.data.results.length -1)
      ])
      return 
    }
    fetchMovie()
  }, [])
  


  return (
    <div
      className={css.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={css.banner__contents}>
        <h1 className={css.banner__title}>
          {movie?.title || movie?.name || movie?.original_title}
        </h1>
        <div className={css.banner__buttons}>
          <button className={css.bunner__button}>Play</button>
          <button className={css.bunner__button}>My list</button>
        </div>
        <h1 className={css.banner__description}>
          {troncate(movie?.overview, 180)}
        </h1>
      </div>
      <div className={css.banner___fedeBottom} />
    </div>
  );
};

export default Banner;
