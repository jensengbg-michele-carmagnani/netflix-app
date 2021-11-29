import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import css from "./SignIn.module.css";
import { auth } from "../../firebase";
import { TextField } from "@material-ui/core";
import { useHistory } from 'react-router-dom';



const SignIn = () => {
  const history = useHistory();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);



  const signInHandler = (e) => {
    console.log("In sign in", e)
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        setIsLoading(false);
        console.log(user)
        if (user) {
          history.replace('/movies');
          return user;
        } else {
          return user.then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: nameRef.current.value,
        })
        history.replace('/movies');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    setIsLoading(true);

    if (isLogin) {
      signInHandler(event)
    } else {
      signUpHandler(event)
    }
  }



  return (
    <div className={css.signIn}>
      <h1 className={css.heading}>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={submitHandler} className={css.signIn__signUpForm}>
        {!isLogin && (
          <input type="name" placeholder="Name" ref={nameRef} />
        )}
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <div><span>{error}</span></div>

        <button>{isLogin ? 'Login' : 'Create Account'}</button>

        <h3 className={css.toggle}
          onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </h3>
      </form>
    </div>

  );
};

export default SignIn;