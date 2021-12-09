import React, { useEffect, useState } from "react";

import css from "./ActorBanner.module.css";

const ActorBanner = (props) => {
  const {
    profile_path,
    name,
    biography,
    birthday,
    deathday,
    homepage,
    also_known_as,
    popularity,
    place_of_birth,
  } = props.infoActor;

  return (
    <div
      className={css.bannerActor}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${profile_path}")`,
        borderRadius: '5px',

      }}
    >
      <div className={css.bannerActor__contents}>
        <section className={css.bannerActor__title}>
          <h1>{name}</h1>
        </section>
        <section className={css.bannerActor__info}>
          <article className={css.bannerActor__biography}>
            <h2>Biography</h2>
            <p>{biography}</p>
          </article>
          <article className={css.bannerActor__sensitiveData}>
            <div>
              <h4>Birthday : </h4> <span>{birthday}</span>
            </div>
            <div>
              <h4>Deathday : </h4>{" "}
              {deathday ? <span>{deathday}</span> : <span>none</span>}
            </div>
            <div>
              <h4>Also know as : </h4>{" "}
              {also_known_as ? <span>{also_known_as}</span> : <span>none</span>}
            </div>
            <div>
              <h4>Place of Birth : </h4>{" "}
              {place_of_birth ? (
                <span>{place_of_birth}</span>
              ) : (
                <span>none</span>
              )}
            </div>
            <div>
              <h4>HomePage : </h4>{" "}
              {homepage ? <span>{homepage}</span> : <span>none</span>}
            </div>
            <div>
              <h4>Popularity : </h4>{" "}
              {popularity ? <span>{popularity}</span> : <span>none</span>}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ActorBanner;
