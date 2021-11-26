import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Error from "../UI/Error";
import requests from "../../lib/Requests";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import css from "./Row.module.css";
import axios from "../../lib/axios";
import { RowProp } from "../../../types/Screens";
import {Movie} from "../../../types/Movie"
import {Https} from "../../../types/UseHttp"


const Row: React.FC<RowProp> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const base_url_img = requests.base_url_img;

  useEffect(() => {
    fetchTask();
  }, []);

  const getMovies = (paylod:Movie[]) => {
    setMovies(paylod) ;
  };
  
  const {
    error,
    isLoading,
    sendRequest: fetchTask,
  } = useHttp<Https>({ url: fetchUrl, getMovies });
  

  if (error) {
    return (
      <Error
        onError={{ message: "Somesthing went wrong, try again later!", error }}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
 
  const imgRow = `${css.row__poster} ${isLargeRow && css.row__posterLarge}`;
  return (
    <div className={css.row} key={Math.random().toString(36).substr(2, 9)}>
      <h2>{title}</h2>
      <div className={css.row__posters}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Link to={`/movies/${movie.id}`} key={movie.id} >
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
