import React, { useEffect } from "react";
import Banner from "../components/Header/Banner";
import requests from "../lib/Requests";
import Films from "../components/Films/Films";



export const FilmsScreen = (props) => {
 
 
  useEffect(() => {
    window.addEventListener("scroll", props.moviesScreenBarHandler);
    return () => window.removeEventListener("scroll", props.moviesScreenBarHandler);
  }, [props.moviesScreenBarHandler]);

  return (
    <div>
      <Banner />
      <Films
        title="Top Twenty"
        fetchUrl={requests.fetchFilmsTopten}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Family"
        fetchUrl={requests.fetchFilmsFamily}
        base_url_img={requests.base_url_img}
      />

      <Films
        title="Crime"
        fetchUrl={requests.fetchFilmsCrime}
        base_url_img={requests.base_url_img}
      />

      <Films
        title="Drama"
        fetchUrl={requests.fetchFilmsDrama}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Documentaries"
        fetchUrl={requests.fetchFilmsDocumentaries}
        base_url_img={requests.base_url_img}
      />
    </div>
  );
};

export default FilmsScreen;
