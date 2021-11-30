import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

import Layout from "./components/Layout/Layout";
import HomeScreen from "./Pages/HomeScreen";
import LoginScreen from "./Pages/LoginScreen";
import Profile from "./Pages/ProfileScreen";

import TvSeriesScreen from "./Pages/TvSeriesScreen";
import FilmsScreen from "./Pages/FilmsScreen";
import MovieDetail from "./components/HomeScreenLayout/MovieDetail";
import NotFoundScreen from "./Pages/NotFoundScreen";
import MyListScreen from "./Pages/MyListScreen";
import TrendyScreen from "./Pages/TrendyScreen";
import ActorDetails from "./components/HomeScreenLayout/ActorDetails"
import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);
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
  }, [dispatch, history]);

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

            <Route path="/series">
              <TvSeriesScreen
                seriesScreenBarHandler={transitionNavBarHandler}
              />
            </Route>

            <Route path="/films">
              <FilmsScreen moviesScreenBarHandler={transitionNavBarHandler} />
            </Route>

            <Route path="/latest">
              <TrendyScreen trandyScreenHanlder={transitionNavBarHandler} />
            </Route>
            <Route path="/myfavorites" >
              <MyListScreen />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/movies/:movieId" exact>
              <MovieDetail />
            </Route>
            <Route path="/actor/:actorId" exact>
              <ActorDetails />
            </Route>

            <Route path="*">
              <NotFoundScreen />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path="/">
            <LoginScreen />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
