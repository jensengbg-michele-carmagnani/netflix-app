import React from "react";
import Banner from "../components/Header/Banner";
import requests from "../lib/Requests";
import Films from "../components/Films/Films";

export const FilmsScreen = () => {

  console.log(requests.fetchFilmsAction)
  return (
    <div>
      <Banner />
      <Films title="Top Twenty" fetchUrl={requests.fetchFilmsTopten} />
      <Films
        title="Action & Adventure"
        fetchUrl={requests.fetchFilmsAction}
        isLargeRow
      />
      <Films
        title="Animation"
        fetchUrl={requests.fetchFilmsAnimation}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Fantasy"
        fetchUrl={requests.fetchFilmsFantasy}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Commedy"
        fetchUrl={requests.fetchFilmsCommedy}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Crime"
        fetchUrl={requests.fetchFilmsCrime}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Soap"
        fetchUrl={requests.fetchFilmsSoap}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Western"
        fetchUrl={requests.fetchFilmsWestern}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="Drama"
        fetchUrl={requests.fetchFilmsDrama}
        base_url_img={requests.base_url_img}
      />
      <Films
        title="War & Politics"
        fetchUrl={requests.fetchFilmsWarPolitics}
        base_url_img={requests.base_url_img}
      />
    </div>
  );
};

export default FilmsScreen;
