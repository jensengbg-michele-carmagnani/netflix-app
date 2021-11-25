import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import requests from "../../lib/Requests";
import css from "./TrendyActors.module.css";

const TrendyActors = (props) => {
  const { fetchUrl, title } = props;
  const [trendyActors, setTrendyActors] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  const getMovies = (paylod) => {
    setTrendyActors(paylod);
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
    <div className={css.trendyActors}>
      <h1>{title}</h1>
      <div className={css.trendyActors__postersRow}>
        {trendyActors?.map((actor) => (
          <Link to={`/actor/${actor.id}`}>
            <div className={css.actory__poster}>
              {/* {title === "Top Twenty" && <img src={icons[0].src} alt={serie.title}/>} */}
              <img
                className={css.trendyActors__img}
                key={actor.id}
                src={`${requests.base_url_img}${actor.profile_path}`}
                alt={actor.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendyActors;
