import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../lib/Requests";
import axios from "axios";
import css from "./MovieDetail.module.css";
import db from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";


import avatar from "../../Assets/Netflix-avatar.png";
import add from "../../Assets/add50-ico.png";
import check from "../../Assets/check50-ico.png";

const MovieDetail = () => {

  const [movie, setMovie] = useState({});
  const [movieCast, setMovieCast] = useState([]);
  

  const dispatch = useDispatch();
  const movieId = useParams().movieId;
  const user = useSelector(selectUser);
  const base_url_img = "https://image.tmdb.org/t/p/original/";
  const favoriteList = useSelector((state) => state.user.favoriteList);

  const troncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  const details_Url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos&append_to_response=videos`;
  const movieCast_url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(details_Url);
      setMovie(response.data);
    };
    const fetchMovieCast = async () => {
      const response = await axios.get(movieCast_url);
      setMovieCast(response.data.cast);
    };
    fetchMovieDetails();
    fetchMovieCast();
  }, []);
  



  const addFavoriteHandler = async () => {
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .add(movie)
      .then(() => {

        alert(` ${movie?.title} succefully added!`);
      })
      .catch((error) => console.log(error));
  };

  const removeFavoriteHandler = async () => {
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .doc(user.favoriteMovieId)
      .delete()
      .then(() => {
        alert("Movie succefully deleted!");
      })
      .catch((error) => console.log(error));
    
  };


  

  
   const isFavorite = favoriteList.some((movie) => movie.movieId == movieId); 

  return (
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
            {troncate(movie?.overview, 180)}
          </h1>
          <div className={css.banner__buttons}>
            {!isFavorite  ? (
              <img src={add} alt="" onClick={addFavoriteHandler} />
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
            <p>
              {movie?.vote_average}
              <span>&#9734;</span> <span>&#9734;</span> <span>&#9734;</span>{" "}
              <span>&#9734;</span> <span>&#9734;</span>{" "}
            </p>
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
            {movie.genres?.map((gen) => (
              <p key={gen.id}>{gen.name}</p>
            ))}
          </article>
        </section>
      </section>
      <section className={css.moviedetail__cast_info}>
        {movieCast.map((actor) => (
          <div className={css.moviedetail__cast_card} key={actor.id}>
            <img
              key={actor.id}
              src={
                actor.profile_path
                  ? `${base_url_img}${actor.profile_path}`
                  : avatar
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MovieDetail;
