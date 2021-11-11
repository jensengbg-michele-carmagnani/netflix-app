import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../lib/Requests";
import axios from "axios";
import css from "./MovieDetail.module.css";
import db from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { favoriteMovie } from "../../features/userSlice";
import add from "../../Assets/add-circle-outline.svg";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const movieId = useParams().movieId;
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const troncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  const details_Url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos&append_to_response=videos`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(details_Url);
      setMovie(response.data);
    };
    fetchMovieDetails();
    checkFaboriteList();
  }, []);

  const addFavoriteHandler = async () => {
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .add(movie)
      .then((docRef) => alert(` ${movie?.title} succefully added!`))
      .catch((error) => console.log(error));
    setIsDisable(true);
  };
  const removeFavoriteHandler = () => {
    db.collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .doc(user.favoriteMovieId)
      .delete()
      .then(() => alert("Movie succefully deleted!"))
      .catch((error) => console.log(error));
    setIsDisable(false);
  };
  const checkFaboriteList = async () => {
    console.log("checkfavorites");
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id === movie.id) {
            dispatch(favoriteMovie(doc.id));
            setIsDisable(true);
          }
        });
      });
  };

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
            {isDisable ? (
              <button
                onClick={addFavoriteHandler}
                className={css.bunner__button}
              >
                + My list
              </button>
            ) : (
              <button
                onClick={removeFavoriteHandler}
                className={css.bunner__button}
              >
                - My list
              </button>
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
              <span>&#9734;</span>{" "}
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
    </div>
  );
};

export default MovieDetail;
