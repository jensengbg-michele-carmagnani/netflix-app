import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Movie} from "../../../types/Movie"

import useHttp from "../../hooks/use-http";
import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import requests from "../../lib/Requests";
import css from "./TvSeries.module.css";
import { RowsType } from "../../../types/RowsType";

<<<<<<< HEAD:src/components/TvSeries/TvSeries.tsx
const TvSeries: React.FC<RowsType> = (props) => {
  const {fetchUrl, title} = props
  const [tvSeries, setTvSeries] = useState<Movie[]>([]);

=======
const TvSeries = (props) => {
  const { fetchUrl, title, isLargeRow } = props;
  const [tvSeries, setTvSeries] = useState([]);
  const [refinedList, setRefinedList] = useState([]);
>>>>>>> development:src/components/TvSeries/TvSeries.js

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
      setTvSeries(paylod);
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

  return (
    <div className={css.tvseries}>
      <h1>{title}</h1>
      <div className={css.tvseries__postersRow}>
        {!isLargeRow
          ? tvSeries.map((serie, i) => (
              <Link to={`/movies/${serie.id}`} key={serie.id}>
                <div
                  className={(isLargeRow && i < 10) ? css.film__rankingContainer: null}
                >
                  {isLargeRow && i < 10 && (
                    <h1 className={css.film___rankingNumber}>{i + 1}</h1>
                  )}
                  <div className={css.tvseries__poster}>
                    <img
                      className={css.tvseries__img}
                      key={serie.id}
                      src={`${requests.base_url_img}${
                        serie.poster_path || serie.backdrop_path
                      }`}
                      alt={serie.name}
                    />
                  </div>
                </div>
              </Link>
            ))
          : refinedList.map((serie, i) => (
              <Link to={`/movies/${serie.id}`} key={serie.id}>
                <div
                  className={isLargeRow && i < 10 && css.film__rankingContainer}
                >
                  {isLargeRow && i < 10 && (
                    <h1 className={css.film___rankingNumber}>{i + 1}</h1>
                  )}
                  <div className={css.tvseries__poster}>
                    <img
                      className={css.tvseries__img}
                      key={serie.id}
                      src={`${requests.base_url_img}${
                        serie.poster_path || serie.backdrop_path
                      }`}
                      alt={serie.name}
                    />
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default TvSeries;
