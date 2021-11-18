import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import requests from "../../lib/Requests";
import { MyFavorites } from "../../../types/MyFavorites";
import { MovieDetails } from "../../../types/MovieDetails";

import css from "./MyList.module.css";


const MyList: React.FC = () => {
  const user = useAppSelector(state=>state.user.user);
  const [myFavorite, setMyFavorite] = useState<MyFavorites[]>([]);

  const getFavoriteHandler = async () =>
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("favorite_session")
      .get()
      .then((querySnapshot) => {
        const favoriteMovies: MyFavorites[] = [];
        querySnapshot.forEach((fav) => {
          if (fav.exists) {
            favoriteMovies.push({
              docId: fav.id,
              movie: fav.data() as MovieDetails,
            });
          }
        });
        setMyFavorite(favoriteMovies);
      })
      .catch((error) => {
        console.error(error);
      });

  useEffect(() => {
    getFavoriteHandler();
  }, []);

  return (
    <div className={css.mylist}>
      <h1>My List</h1>
      <div className={css.mylist__gridcontainer}>
        {myFavorite.map((fav) => (
          <Link to={`/movies/${fav.movie.id}`}>
            <div className={css.mylist__griditem}>
              <img
                className={css.mylist__img}
                key={fav.movie.id}
                src={`${requests.base_url_img}${
                  fav.movie.poster_path || fav.movie.backdrop_path
                }`}
                alt={fav.movie.name}
              />
            </div>
            <h3>{fav.movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyList;
