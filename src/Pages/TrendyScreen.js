import React, { useEffect, useState } from "react";
import Banner from "../components/Header/Banner";
import requests from "../lib/Requests";

import Trendy from "../components/Trandy/Trendy";
import TrendyActors from "../components/Trandy/TrendyActors";
import css from "./TrendyScreen.module.css";

const TrendyScreen = (props) => {
  const [isLargeRow] = useState(true)
  useEffect(() => {
    window.addEventListener("scroll", props.seriesScreenBarHandler);
    return () =>
      window.removeEventListener("scroll", props.seriesScreenBarHandler);
  }, [props.seriesScreenBarHandler]);
  return (
    <div className={css.trendyScreen}>
      <Banner />
      <Trendy
        fetchUrl={requests.fetchTrendyOfWeekAll}
        title="Trendy this week"
        isLargeRow={isLargeRow}
      />
      <Trendy
        fetchUrl={requests.fetchTrendyOfDayTv}
        title="Today's catched TV"
      />
      <Trendy
        fetchUrl={requests.fetchTrendyOfdayMovie}
        title="Today's catched Movie"
      />
      <TrendyActors
        fetchUrl={requests.fetchTrendyOfdayPerson}
        title="The actor of the day!"
      />
    </div>
  );
};

export default TrendyScreen;
