import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../lib/Requests";
import { Link } from "react-router-dom";

import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";

import ActorBanner from "../Header/ActorBanner";
import css from "./ActorDetails.module.css";
import requests from "../../lib/Requests";
import axios from "../../lib/axios";

const ActorDetails = () => {
  const params = useParams();
  const actorId = params.actorId;
  const fetchUrl = `/person/${actorId}?api_key=${API_KEY}&language=en-US`;
  const fetchUrlCredits = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`;
  const [actorDetails, setActorDetails] = useState({});
  const [credits, setCredits] = useState(null);

  const base_url_img = requests.base_url_img;

  useEffect(() => {
    fetchTask();
    getCredits();
  }, []);

  const getActor = (payload) => {
    setActorDetails(payload);
  };

  const getCredits = async () => {
    const response = await axios.get(fetchUrlCredits);
    console.log("fimlography", response.data.cast);
    setCredits(response.data.cast);
  };

  const {
    error,
    isLoading,
    sendRequest: fetchTask,
  } = useHttp({ url: fetchUrl, getActor });

  if (error) {
    <Error />;
  }
  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className={css.actorDetails}>
      <ActorBanner infoActor={actorDetails} />
      <div className={css.row}>
        <h2>Filmography</h2>
        <div className={css.row__posters}>
          {credits &&
            credits.map(
              (movie) =>
                movie.backdrop_path && (
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      className={css.row__poster}
                      key={movie.id}
                      src={`${base_url_img}${movie.poster_path}`}
                      alt={movie.name}
                    />
                  </Link>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
