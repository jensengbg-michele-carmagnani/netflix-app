import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import css from "./Row.module.css";
import axios from "../../lib/axios";
import { RowProp } from "../../../types/Screens";
import {Movie} from "../../../types/Movie"

const Row: React.FC<RowProp> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const base_url_img = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    };
    fetchData();
  }, [fetchUrl]);

  const imgRow = `${css.row__poster} ${isLargeRow && css.row__posterLarge}`;
  return (
    <div className={css.row}>
      <h2>{title}</h2>
      <div className={css.row__posters}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Link to={`/movies/${movie.id}`}>
                <img
                  className={imgRow}
                  key={movie.id}
                  src={`${base_url_img}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Row;
