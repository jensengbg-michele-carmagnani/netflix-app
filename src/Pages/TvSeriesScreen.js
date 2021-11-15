import React, { useEffect, useState } from 'react'
import axios from "../lib/axios";
import requests from "../lib/Requests";
import TvSeries from "../components/TvSeries/TvSeries"

const TvSeriesScreen = () => {
  const [tvSeries, setTvSeries] = useState({});
    
  useEffect(() => {
    const getSeriesHandler = async () => {
      const response = await axios.get(
        `${requests.fetchTvseries}`
      );
      setTvSeries(response.data.results)
    };
    getSeriesHandler();
  }, []);
  console.log(tvSeries);
  return (
    <TvSeries tvSeries={tvSeries}/>
  )
}

export default TvSeriesScreen
