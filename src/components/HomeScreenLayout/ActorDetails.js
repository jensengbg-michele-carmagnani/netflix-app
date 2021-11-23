import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../lib/Requests";

import Error from "../UI/Error";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import axios from "../../lib/axios";
import ActorBanner from "../Header/ActorBanner";

import css from "./ActorDetails.module.css";

const ActorDetails = () => {
  const params = useParams();
  const actorId = params.actorId;
  const fetchUrl = `/person/${actorId}?api_key=${API_KEY}&language=en-US`;
  const [actorDetails, setActorDetails] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const getActor = (payload) => {
    setActorDetails(payload);
  };

  const {
    error,
    isLoading,
    sendRequest: fetchTask,
  } = useHttp({ url: fetchUrl, getActor});

  console.log(actorDetails);

  if (error) {
    <Error />;
  }
  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className={css.actorDetails}>
      <ActorBanner
        name={actorDetails?.name}
        profileUrl={actorDetails?.profile_path}
      />
      <section className={css.actorDetails__info}>
        <article className={css.actorDetails__biography}>
          <h2>Biography</h2>
          <p>{actorDetails?.biography}</p>
        </article>
        <article className={css.actorDetails__personalInformation}>
          <h4>Birthday : </h4> <span>{actorDetails?.birthday}</span>
          <h4>Dethday : </h4> <span>{actorDetails?.deathday}</span>
          <h4>HomePage : </h4> <span>{actorDetails?.homepage}</span>
        </article>
        <article className={css.actorDetails__biography}></article>
        <article className={css.actorDetails__biography}></article>
      </section>
    </div>
  );
};

export default ActorDetails;
