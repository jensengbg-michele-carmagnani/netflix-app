import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../lib/axios";
import requests from "../../lib/Requests";
import css from "./TvSeries.module.css";

const TvSeries = (props) => {
  const [tvSeries, setTvSeries] = useState([]);

useEffect(() => {
  const getSeriesHandler = async () => {
    const response = await axios.get(`${requests.fetchTvseries}`);
    setTvSeries(response.data.results);
  };
  getSeriesHandler();
}, []);
 
  console.log("seriesComponent", tvSeries);
  return (
    <div className={css.tvseries}>
      <h1>My List</h1>
      <div className={css.tvserie__gridcontainer}>
        {tvSeries.map((serie) => (
          <Link to={`/movies/${serie.id}`}>
            <div className={css.mylist__griditem}>
              <img
                className={css.tvserie__img}
                key={serie.id}
                src={`${requests.base_url_img}${
                  serie.poster_path || serie.backdrop_path
                }`}
                alt={serie.name}
              />
            </div>
            <h3>{serie.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TvSeries;
