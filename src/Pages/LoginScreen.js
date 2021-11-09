import React, { useState, Fragment } from "react";
import css from "./LoginScreen.module.css";
import SignIn from "../components/Login/SignIn";

const Login = () => {
  const [signIn, setSignIn] = useState(false);

  const signInHandler = () => {
    setSignIn(true);
  };
  
  return (
    <div className={css.loginScreen}>
      <div className={css.loginScreen__background}>
        <img
          className={css.loginScreen__logo}
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button
          className={css.loginScreen__signInButton}
          onClick={signInHandler}
        >
          Sign In
        </button>
        {signIn ? (
          <SignIn />
        ) : (
          <>
            <div className={css.loginScreen__body}>
              <h1>Ulimeted film, Tv and programmes and more.</h1>
              <h2>Watch anywhere. Cancel any time </h2>
              <h3>
                Read to watch? Enter your email to create or restart your
                membership
              </h3>
              <div className={css.loginScreen__input}>
                <form>
                  <input type="email" placeholder="Email address" />
                  <button
                    className={css.loginScreen__buttonSubmit}
                    onClick={signInHandler}
                  >
                    Get started >
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
        <div className={css.loginScreen__gredient} />
      </div>
    </div>
  );
};

export default Login;
