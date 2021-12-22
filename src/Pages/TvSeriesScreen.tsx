<<<<<<< HEAD:src/Pages/TvSeriesScreen.tsx

import React, { useEffect } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> development:src/Pages/TvSeriesScreen.js
import requests from "../lib/Requests";
import TvSeries from "../components/TvSeries/TvSeries";
import Banner from "../components/Header/Banner";
import css from "./TvSeriesScreen.module.css";
<<<<<<< HEAD:src/Pages/TvSeriesScreen.tsx
import { NavBarHandler } from "../../types/Screens";
const TvSeriesScreen: React.FC<{ seriesScreenHandler: NavBarHandler }> = (
  props
) => {
  useEffect(() => {
    window.addEventListener("scroll", props.seriesScreenHandler);
    return () =>
      window.removeEventListener("scroll", props.seriesScreenHandler);
  }, [props.seriesScreenHandler]);
=======
const TvSeriesScreen = (props) => {
  const [isLargeRow, setIsLargeRow] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", props.trandyScreenHanlder);
    return () =>
      window.removeEventListener("scroll", props.trandyScreenHanlder);
  }, [props.trandyScreenHanlder]);
>>>>>>> development:src/Pages/TvSeriesScreen.js

  return (
    <div className={css.tvSeriesScreen}>
      <Banner />
<<<<<<< HEAD:src/Pages/TvSeriesScreen.tsx
      <TvSeries title="Top Twenty" fetchUrl={requests.fetchTvseriesTopten} />
=======
      <TvSeries
        title="Top Ten"
        fetchUrl={requests.fetchTvseriesTopten}
        isLargeRow={isLargeRow}
      />
>>>>>>> development:src/Pages/TvSeriesScreen.js
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
