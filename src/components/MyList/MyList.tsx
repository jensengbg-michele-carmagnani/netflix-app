import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import requests from "../../lib/Requests";
import { MyFavorites } from "../../../types/MyFavorites";
import { MovieDetails } from "../../../types/MovieDetails";

import MediaCard from "../MediaCards/MediaCard"
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core/'
import Box from '@material-ui/core/Box';
import css from "./MyList.module.css";
import add from "../../Assets/add50-ico.png";
import check from "../../Assets/check50-ico.png";


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
    <Box p={5} pt={15} minHeight="100vh">
      <Typography className={css.headingh5}  variant="h5" component="h2"> My List
      </Typography>
      <Grid container spacing={1} className={css.GridContainer}>
        {myFavorite.map((fav) => (
          <Grid key={fav.movie.id} item spacing={5} key={Math.random().toString(36).substr(2, 9)} >
            <Link to={`/movies/${fav.movie.id}`} key={Math.random().toString(36).substr(2, 9)}>
              <MediaCard image={`${requests.base_url_img}${fav.movie.poster_path || fav.movie.backdrop_path
                }`}
                title={fav.movie.original_title}
                movie={fav.movie}
                tagline={fav.movie.tagline}
                id={fav.movie.id}
                key={Math.random().toString(36).substr(2, 9)}
              />

            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyList;
