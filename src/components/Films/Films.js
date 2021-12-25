import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import css from "./Films.module.css";

const Films = (props) => {
  const { title, fetchUrl, base_url_img, isLargeRow } = props;
  const [films, setFilms] = useState([]);
  const [refinedList, setRefinedList] = useState([]);
  const getMovies = (paylod) => {
    let refinedPayload = [];
    for (let key in paylod) {
      if (+key < 10 && isLargeRow) {
        refinedPayload.push(paylod[key]);
        setRefinedList(refinedPayload);
      }
    setFilms(paylod);
    }
  };
  const {
    error,
    isLoading,
    sendRequest: fetchTask,
  } = useHttp({ url: fetchUrl, getMovies });

  useEffect(() => {
    fetchTask();
  }, []);

  

 

  if (error) {
    return (
      <Error
        onError={{
          message: "Somesthing went wrong, try again later!",
          ...error,
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className={css.films}>
      <h1>{title}</h1>
      <div className={css.films__postersRow}>
        {!isLargeRow
          ? films?.map((film, i) => (
              <Link to={`/movies/${film.id}`} key={film.id}>
                <div
                  className={
                    isLargeRow && i < 10 ? css.film__rankingContainer : null
                  }
                >
                  {isLargeRow && i < 10 && (
                    <h1 className={css.film___rankingNumber}>{i + 1}</h1>
                  )}

                  <div className={css.films__poster}>
                    <img
                      className={css.films__img}
                      key={film.id}
                      src={`${base_url_img}${
                        film.poster_path || film.backdrop_path
                      }`}
                      alt={film.name}
                    />
                  </div>
                </div>
              </Link>
            ))
          : refinedList?.map((film, i) => (
              <Link to={`/movies/${film.id}`} key={film.id}>
                <div
                  className={isLargeRow && i < 10 && css.film__rankingContainer}
                >
                  {isLargeRow && i < 10 && (
                    <h1 className={css.film___rankingNumber}>{i + 1}</h1>
                  )}

                  <div className={css.films__poster}>
                    <img
                      className={css.films__img}
                      key={film.id}
                      src={`${base_url_img}${
                        film.poster_path || film.backdrop_path
                      }`}
                      alt={film.name}
                    />
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Films;
