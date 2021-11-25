import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import Error from '../UI/Error'
import LoadingSpinner from '../UI/LoadingSpinner'
import css from "./Films.module.css";

const Films = (props) => {
  const { title, fetchUrl, base_url_img } = props;
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  const getMovies = (paylod) => {
    setFilms(paylod);
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
    <div className={css.films}>
      <h1>{title}</h1>
      <div className={css.films__postersRow}>
        {films?.map((film) => (
          <Link to={`/movies/${film.id}`} key={film.id}>
            <div className={css.films__poster}>
              {/* {title === "Top Twenty" && <img src={icons[0].src} alt={serie.title}/>} */}
              <img
                className={css.films__img}
                key={film.id}
                src={`${base_url_img}${film.poster_path || film.backdrop_path}`}
                alt={film.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Films;
