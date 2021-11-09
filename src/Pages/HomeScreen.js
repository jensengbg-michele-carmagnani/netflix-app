import React, { useEffect } from "react";
import css from "./HomeScreen.module.css";
import Banner from "../components/Header/Banner";
import Row from "../components/HomeScreenLayout/Row";
import requests from "../lib/Requests";

const HomeScreen = (props) => {
  useEffect(() => {
    window.addEventListener("scroll", props.homeScreenHandler);
    return () => window.removeEventListener("scroll", props.homeScreenHandler);
  }, [props.homeScreenHandler]);

  return (
    <div className={css.homescreen}>
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="Top Rated" fetchUrl={requests.fetchTopReted} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchCommedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetchUrl={requests.fetchRomaticMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

    </div>
  );
};

export default HomeScreen;
