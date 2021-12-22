import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY } from "../../lib/Requests";
import { useAppSelector } from "../../app/hooks";

import axios from "axios";
import db from "../../firebase";


import Error from "../UI/Error";
import avatar from "../../Assets/Netflix-avatar.png";
import plus from "../../Assets/add50-ico.png";
import check from "../../Assets/check50-ico.png";
import {optionNotification} from '../../../types/MovieDetails'
import { MovieDetails } from "../../../types/MovieDetails";
import { Cast } from "../../../types/MovieCast";
import { troncate } from "../../../types/Movie";
import {UserSlice} from "../../../types/User"
import {errorMsg} from "../../../types/MovieDetails"
import { FaStar, FaStarHalf } from "react-icons/fa";
import css from "./MovieDetail.module.css";

const MovieDetail: React.FC= () => {
  const [movie, setMovie] = useState<MovieDetails>();
  const [movieCast, setMovieCast] = useState<Cast[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isFavoriteDocRefId, setIsFavoriteDocRefId] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<errorMsg>();
  const [startPercentage, setStartPercentage] = useState<number>(0);

  const movieId = useParams<{ movieId: string }>().movieId;
  const user  = useAppSelector(state => state.user.user) as UserSlice;
  const base_url_img = "https://image.tmdb.org/t/p/original/";

  const troncate: troncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  const details_Url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos&append_to_response=videos`;
  const movieCast_url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
     if(movie?.vote_average){
    setStartPercentage( Math.round(( movie?.vote_average / 10) * 100)) 
  }
 
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(details_Url);
        setMovie(response.data);
      } catch (error) {
        setErrorMsg({
          message: "Something went wrong, Try later",
          error: error.message,
        });
      }
    };
    console.log(errorMsg);

    const fetchMovieCast = async () => {
      const response = await axios.get(movieCast_url);
      setMovieCast(response.data.cast);
    };
    fetchMovieDetails();
    fetchMovieCast();
    isFavoriteDB();
    docRef();
  }, []);

  // sericeWorker Notification
  const notificationHandler = (options:optionNotification) => {
    let notif = new Notification("Hi", options);
    navigator.serviceWorker.ready.then((reg) =>
      reg.showNotification("Reminder", options)
    );
    notif.addEventListener("show", () => {
      console.log("Show notification");
    });
  };

  // check for update favorite_session into db & setIsFavorite
  const isFavoriteDB = async () =>
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((movie) => {
          if (movie.data().id === +movieId) {
            setIsFavorite(true);
          }
        });
      });

  // find the docRef to the releted movie
  const docRef = async () =>
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((movie) => {
          if (movie.data().id === +movieId) {
            setIsFavoriteDocRefId(movie.id);
            setIsFavorite(true);
          }
        });
      })
      .catch((error) => {
        setErrorMsg({
          message: "Something went wrong, Try later",
          error: error.message,
        });
      });

  const addFavoriteHandler = async () => {
<<<<<<< HEAD:src/components/HomeScreenLayout/MovieDetail.tsx
    if(movie){
      await db
        .collection("customers")
        .doc(user.uid)
        .collection("favorite_session")
        .add(movie)
        .then(() => {
          const options: optionNotification = {
            body: "Movie succefully added!",
          };
          notificationHandler(options);
        })
        .catch((error) =>
          setErrorMsg({ message: error.message, errorType: error })
        );
    }
=======
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .add(movie)
      .then(() => {
        const options = {
          body: "Movie succefully added!",
        };
        notificationHandler(options);
      })
      .catch((error) =>
        setErrorMsg({
          message: "Something went wrong, Try later",
          error: error.message,
        })
      );
>>>>>>> development:src/components/HomeScreenLayout/MovieDetail.js
  };

  const removeFavoriteHandler = async () => {
    await docRef();
    if (isFavoriteDocRefId) {
      await db
        .collection("customers")
        .doc(user.uid)
        .collection("favorite_session")
        .doc(isFavoriteDocRefId)
        .delete()
        .then(() => {
          const options = {
            body: "Movie succefully deleted!",
          };
          notificationHandler(options);

          setIsFavorite((prevState) => !prevState);
        })
        .catch((error) =>
          setErrorMsg({
            message: "Something went wrong, Try later",
            error: error.message,
          })
        );
    }
  };
<<<<<<< HEAD:src/components/HomeScreenLayout/MovieDetail.tsx
 
 
=======

  const startPercentage = Math.round((movie?.vote_average / 10) * 100);
>>>>>>> development:src/components/HomeScreenLayout/MovieDetail.js

  return (
    <>
    
      {errorMsg ? (
<<<<<<< HEAD:src/components/HomeScreenLayout/MovieDetail.tsx
        <Error message={errorMsg.message} error={errorMsg.errorType} />
=======
        <div className={css.errorMessage}>
          <Error
            onError={{ message: errorMsg.message, error: errorMsg.error }}
          />
        </div>
>>>>>>> development:src/components/HomeScreenLayout/MovieDetail.js
      ) : (
        <div className={css.moviedetail}>
        <div
            className={css.banner}
        style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            }}
          >
            <div className={css.banner__contents}>
              <h1 className={css.banner__title}>
                {movie?.title || movie?.name || movie?.original_title}
              </h1>
              <h1 className={css.banner__description}>
                {movie?.overview && troncate(movie?.overview, 180)}
              </h1>
              <div className={css.banner__buttons}>
                {!isFavorite ? (
                  <img  src={plus} alt="" onClick={addFavoriteHandler} />
                ) : (
                  <img src={check} alt="" onClick={removeFavoriteHandler} />
                )}
              </div>
            </div>
            <div className={css.banner___fedeBottom} />
          </div>
          <section className={css.moviedetail__wrapper}>
            <section className={css.moviedetail__info}>
              <article>
                <h4>Original Title: </h4>
                <p> {movie?.original_title}</p>
              </article>
              <article>
                <h4>Status: </h4>
                <p> {movie?.status}</p>
              </article>
              <article>
                <h4>Vote: </h4>
                <div className={css.moviedetail__vote}>
                  {[...Array(5)].map((star, i) => {
                    const indexRating = (i + 1) * 20;
                    const prevIndex = (i + 1) * 20 - 20;

                    if (
                      startPercentage < indexRating &&
                      startPercentage > prevIndex
                    ) {
                      return <FaStarHalf color="#ffc107" key={i} />;
                    } else if (startPercentage > indexRating) {
                      return <FaStar color="#ffc107" key={i} />;
                    } else {
                      return <FaStar color="#575757" key={i} />;
                    }
                  })}

                  <span> {movie?.vote_average}</span>
                </div>
              </article>
            </section>
            <section className={css.moviedetail__info}>
              <article>
                <h4>Release Date: </h4>
                <p> {movie?.release_date}</p>
              </article>
              <article>
                <h4>Homepage: </h4>
                <a href={movie?.homepage}> Homepage</a>
              </article>

              <article className={css.moviedetail__genres}>
                <h4>Genres: </h4>
                {movie && movie.genres?.map((gen) => (
                  <p key={gen.id}>{gen.name}</p>
                ))}
              </article>
            </section>
          </section>
          <section className={css.moviedetail__cast_info}>
            {movieCast.map((actor) => (
              <div className={css.moviedetail__cast_card} key={actor.id}>
                <Link to={`/actor/${actor.id}`} key={actor.id}>
                  <img
                    key={actor.id}
                    src={
                      actor.profile_path
                        ? `${base_url_img}${actor.profile_path}`
                        : avatar
                    }
                    alt={actor.name}
                  />
                </Link>
                <p key={Math.random().toString(36).substr(2, 9)}>
                  {actor.name}
                </p>
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
  
};

export default MovieDetail;
