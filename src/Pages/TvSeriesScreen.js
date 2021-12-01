import React, { useEffect, useState } from "react";
import requests from "../lib/Requests";
import TvSeries from "../components/TvSeries/TvSeries";
import Banner from "../components/Header/Banner";
import css from "./TvSeriesScreen.module.css";
const TvSeriesScreen = (props) => {
  const [isLargeRow, setIsLargeRow] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", props.trandyScreenHanlder);
    return () =>
      window.removeEventListener("scroll", props.trandyScreenHanlder);
  }, [props.trandyScreenHanlder]);

  return (
    <div className={css.tvSeriesScreen}>
      <Banner />
      <TvSeries
        title="Top Twenty"
        fetchUrl={requests.fetchTvseriesTopten}
        isLargeRow={isLargeRow}
      />
      <TvSeries title="Animation" fetchUrl={requests.fetchTvseriesAnimation} />
      <TvSeries title="Fantasy" fetchUrl={requests.fetchTvseriesFantasy} />
      <TvSeries title="Commedy" fetchUrl={requests.fetchTvseriesCommedy} />
      <TvSeries title="Crime" fetchUrl={requests.fetchTvseriesCrime} />
      <TvSeries title="Western" fetchUrl={requests.fetchTvseriesWestern} />
      <TvSeries title="Drama" fetchUrl={requests.fetchTvseriesDrama} />
    </div>
  );
};

export default TvSeriesScreen;
