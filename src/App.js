import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

import Layout from "./components/Layout/Layout";
import HomeScreen from "./Pages/HomeScreen";
import LoginScreen from "./Pages/LoginScreen";
import Profile from "./Pages/ProfileScreen";

import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  const userStore = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login({ uid: user.uid, email: user.email }));
        history.push("/");
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
      {userStore ? (
        <Layout isShow={show}>
          <Switch>
            <Route path="/" exact>
              <HomeScreen homeScreenHandler={transitionNavBarHandler} />
            </Route>

            <Route path="/series">{/* series */}</Route>
            <Route path="/films">{/* Films */}</Route>
            <Route path="/latest">{/* New & Popular */}</Route>
            <Route path="/my-list">{/* My List */}</Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path="/">
            <Redirect to="/login"></Redirect>
            <LoginScreen />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
