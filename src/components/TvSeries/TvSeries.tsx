import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Movie} from "../../../types/Movie"

import useHttp from "../../hooks/use-http";
import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import requests from "../../lib/Requests";
import css from "./TvSeries.module.css";
import { RowsType } from "../../../types/RowsType";

const TvSeries: React.FC<RowsType> = (props) => {
  const {fetchUrl, title} = props
  const [tvSeries, setTvSeries] = useState<Movie[]>([]);


  useEffect(() => {
    fetchTask();
  }, []);

  const getMovies = (paylod) => {
    setTvSeries(paylod);
  };
  const {
    error,
    isLoading,
    sendRequest: fetchTask,
  } = useHttp({ url: fetchUrl, getMovies });

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

  
    return (
      <div className={css.tvseries}>
        <h1>{title}</h1>
        <div className={css.tvseries__postersRow}>
          {tvSeries.map((serie) => (
            <Link to={`/movies/${serie.id}`} key={serie.id}>
              <div className={css.tvseries__poster}>
                {/* {title === "Top Twenty" && <img src={icons[0].src} alt={serie.title}/>} */}
                <img
                  className={css.tvseries__img}
                  key={serie.id}
                  src={`${requests.base_url_img}${
                    serie.poster_path || serie.backdrop_path
                  }`}
                  alt={serie.name}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  
};

export default TvSeries;
