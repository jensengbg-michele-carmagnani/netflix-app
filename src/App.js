import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser, favoriteList } from "./features/userSlice";
import db from "./firebase";

import Layout from "./components/Layout/Layout";
import HomeScreen from "./Pages/HomeScreen";
import LoginScreen from "./Pages/LoginScreen";
import Profile from "./Pages/ProfileScreen";
import MovieDetail from "./components/HomeScreenLayout/MovieDetail";
import NotFoundScreen from "./Pages/NotFoundScreen";

import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);
const favoriteListArray = useSelector(state=> state.user.favoriteList)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login({ uid: user.uid, email: user.email }));
      } else {
        dispatch(logout);
      }
    });

   
    return unsubscribe;
  }, [dispatch, history,]);

  const getFavoriteList = () => {
    
    if (user !== null) {
      db.collection("customers")
        .doc(user.uid)
        .collection("favorite_session")
        .get()
        .then((querySnapshot) => {
          let favoriteListArray = [];
          querySnapshot.forEach((movie) => {
            favoriteListArray.push({ movieId: movie.data().id });
          });
          dispatch(favoriteList(favoriteListArray));
        });
    }
  }

 
  // if (user) {
    
  //   db.collection("customers")
  //     .doc(user.uid)
  //     .collection("favorite_session")
  //     .onSnapshot((querySnapshot) => {
  //       let newFavoriteList = [];
  //       querySnapshot.forEach((movie) => {
  //         if(favoriteListArray.find(fav =>  fav.movieId !== movie.data().id))
  //           newFavoriteList.push({ movieId: movie.data().id });
  //       });
  //       dispatch(favoriteList(newFavoriteList));
  //     });
  // }
  

  const transitionNavBarHandler = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <>
      {user ? (
        <Layout isShow={show}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/movies" />
            </Route>
            <Route path="/movies" exact>
              <HomeScreen homeScreenHandler={transitionNavBarHandler} />
            </Route>
            <Route path="/series">{/* series */}</Route>
            <Route path="/films">{/* Films */}</Route>
            <Route path="/latest">{/* New & Popular */}</Route>
            <Route path="/my-list">{/* My List */}</Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetail />
            </Route>
            <Route path="*">
              <NotFoundScreen />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
