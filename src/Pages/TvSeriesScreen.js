import React,{useEffect} from 'react'
import requests from '../lib/Requests'
import TvSeries from "../components/TvSeries/TvSeries"
import Banner from '../components/Header/Banner'
import css from "./TvSeriesScreen.module.css"
const TvSeriesScreen = (props) => {

  console.log(props)

  
   useEffect(() => {
     window.addEventListener("scroll", props.seriesScreenHandler);
     return () =>
       window.removeEventListener("scroll", props.seriesScreenHandler);
   }, [props.seriesScreenHandler]);
  
   
  return (
    <div className={css.tvSeriesScreen}>
      <Banner />
      <TvSeries title="Top Twenty" fetchUrl={requests.fetchTvseriesTopten}/>
      <TvSeries title="Action & Adventure" fetchUrl={requests.fetchTvseriesAction} isLargeRow />
      <TvSeries title="Animation" fetchUrl={requests.fetchTvseriesAnimation} />
      <TvSeries title="Fantasy" fetchUrl={requests.fetchTvseriesFantasy} />
      <TvSeries title="Commedy" fetchUrl={requests.fetchTvseriesCommedy} />
      <TvSeries title="Crime" fetchUrl={requests.fetchTvseriesCrime} />
      <TvSeries title="Soap" fetchUrl={requests.fetchTvseriesSoap} />
      <TvSeries title="Western" fetchUrl={requests.fetchTvseriesWestern} />
      <TvSeries title="Drama" fetchUrl={requests.fetchTvseriesDrama} />
      <TvSeries title="War & Politics" fetchUrl={requests.fetchTvseriesWarPolitics} />
    </div>
  );
}

export default TvSeriesScreen

