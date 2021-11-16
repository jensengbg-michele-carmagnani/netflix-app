import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../lib/axios";
import requests from "../../lib/Requests";
import css from "./TvSeries.module.css";
import icons from "../../Assets/Icons"

const TvSeries = (props) => {
  const {fetchUrl, title} = props
  const [tvSeries, setTvSeries] = useState([]);

useEffect(() => {
  const getSeriesHandler = async () => {
    const response = await axios.get(fetchUrl);
    setTvSeries(response.data.results);
  };
  getSeriesHandler();
}, []);
  
 
  
  
 
  
  return (
    <div className={css.tvseries}>
      <h1>{title}</h1>
      <div className={css.tvseries__postersRow}>
        {tvSeries.map((serie) => (
          <Link to={`/movies/${serie.id}`}>
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
