import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Error from "../UI/Error";
import requests from "../../lib/Requests";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import css from "./Row.module.css";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [refinedList, setRefinedList] = useState([]);

  const base_url_img = requests.base_url_img;

  useEffect(() => {
    fetchTask();
  }, []);

  const getMovies = (paylod) => {
    let refinedPayload = [];
    for (let key in paylod) {
      if (+key < 10 && isLargeRow) {
        refinedPayload.push(paylod[key]);
        setRefinedList(refinedPayload);
      }
      setMovies(paylod);
    }
  };
  const {
    error,
    isLoading,
    sendRequest: fetchTask,
  } = useHttp({ url: fetchUrl, getMovies });

  if (error) {
    return (
      <Error
        onError={{ message: "Somesthing went wrong, try again later!", ...error }}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const imgRow = `${css.row__poster} ${isLargeRow && css.row__posterLarge} `;
  return (
    <div className={css.row} key={Math.random().toString(36).substr(2, 9)}>
      <h2>{title}</h2>
      <div className={css.row__posters}>
        {!isLargeRow
          ? movies.map(
              (movie, i) =>
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <div
                      className={
                        (isLargeRow && i < 10) ? css.row__rankingContainer: null
                      }
                    >
                      {isLargeRow && i < 10 && (
                        <h1 className={css.row___rankingNumber}>{i + 1}</h1>
                      )}

                      <img
                        className={imgRow}
                        key={movie.id}
                        src={`${base_url_img && base_url_img}${
                          isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                      />
                    </div>
                  </Link>
                )
            )
          : refinedList.map(
              (movie, i) =>
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <div
                      className={
                        isLargeRow && i < 10 && css.row__rankingContainer
                      }
                    >
                      {isLargeRow && i < 10 && (
                        <h1 className={css.row___rankingNumber}>{i + 1}</h1>
                      )}

                      <img
                        className={imgRow}
                        key={movie.id}
                        src={`${base_url_img && base_url_img}${
                          isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                      />
                    </div>
                  </Link>
                )
            )}
      </div>
    </div>
  );
};

export default Row;
