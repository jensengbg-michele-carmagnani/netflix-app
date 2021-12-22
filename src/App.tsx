import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import { useAppDispatch, useAppSelector } from "./app/hooks";
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
import ActorDetails from "./components/HomeScreenLayout/ActorDetails";
<<<<<<< HEAD:src/App.tsx




const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const user = useAppSelector(selectUser);
=======
// const FilmsScreen = lazy(() => import("./Pages/FilmsScreen"));

function App() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoadin] = useState(false);
  const user = useSelector(selectUser);
>>>>>>> development:src/App.js
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
<<<<<<< HEAD:src/App.tsx
      if (user && user.email) {
=======
      setIsLoadin(true);
      if (user) {
>>>>>>> development:src/App.js
        dispatch(login({ uid: user.uid, email: user.email }));
      } else {
        dispatch(logout);
      }
      setIsLoadin(false);
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
                seriesScreenHandler={transitionNavBarHandler}
              />
            </Route>

            <Route path="/films">
              <FilmsScreen
                component={FilmsScreen}
                moviesScreenBarHandler={transitionNavBarHandler}
              />
            </Route>

            <Route path="/latest">
              <TrendyScreen trandyScreenHanlder={transitionNavBarHandler} />
            </Route>
            <Route path="/myfavorites">
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
};

export default App;
