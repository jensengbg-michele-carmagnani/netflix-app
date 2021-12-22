import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from "./Banner.module.css";
import axios from "../../lib/axios";
import requests from "../../lib/Requests";
import { troncate } from "../../../types/Movie"
import { MovieDetails } from "../../../types/MovieDetails"

const Banner = () => {
  const [movie, setMovie] = useState<MovieDetails>()

  const troncate:troncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(requests.fetchActionMovies);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return;
    };
    fetchMovie();
  }, []);

  return (
    <div 
      className={css.banner}
      style={{
        backgroundImage: `url(${requests.base_url_img}/${movie?.backdrop_path})`,
      }}
    >
      <div className={css.banner__contents}>
        <h1 className={css.banner__title}>
          { movie?.title || movie?.name || movie?.original_title}
        </h1>
        <div className={css.banner__buttons}>
          <button className={css.bunner__button}>Play</button>
          <Link to="/myfavorites">
            <button className={css.bunner__button}>My list</button>
          </Link>
        </div>
        <h1 className={css.banner__description}>
          {movie && troncate(movie.overview, 180)}
        </h1>
      </div>
      <div className={css.banner___fedeBottom} />
    </div>
  );
};

export default Banner;
