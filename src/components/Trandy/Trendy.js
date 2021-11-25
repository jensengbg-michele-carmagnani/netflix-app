import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import requests from "../../lib/Requests";
import css from "./Trendy.module.css";

const Trendy = (props) => {
  const { fetchUrl, title } = props;
  const [trendy, setTrendy] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  const getMovies = (paylod) => {
    setTrendy(paylod);
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
    <div className={css.trendy}>
      <h1>{title}</h1>
      <div className={css.trendy__postersRow}>
        {trendy?.map((trend) => (
          <Link to={`/movies/${trend.id}`}>
            <div className={css.trendy__poster}>
              {/* {title === "Top Twenty" && <img src={icons[0].src} alt={serie.title}/>} */}
              <img
                className={css.trendy__img}
                key={trend.id}
                src={`${requests.base_url_img}${
                  trend.poster_path || trend.backdrop_path
                }`}
                alt={trend.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trendy;
