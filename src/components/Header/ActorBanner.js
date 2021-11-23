import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from "./Banner.module.css";
import axios from "../../lib/axios";
import requests from "../../lib/Requests";

const ActorBanner = (props) => {
  const [movie, setMovie] = useState([]);
  const {profileUrl, name} = props
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(requests.fetchActionMovies);
      setMovie(response.data);
      return;
    };
    fetchMovie();
  }, []);

  return (
    <div
      className={css.bannerActor}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${profileUrl}")`,
      }}
    >
      <div className={css.banner__contents}>
        <h1 className={css.banner__title}>
          {name && name}
        </h1>
      </div>
      <div className={css.banner___fedeBottomActor} />
    </div>
  );
};

export default ActorBanner;
