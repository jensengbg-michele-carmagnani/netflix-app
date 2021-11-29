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

  const [enteredEmail, setEmail] = useState('');
  const [enteredPassword, setPassword] = useState('');
  const [enteredName, setName] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);



  const signInHandler = (e) => {
    console.log("In signin", enteredEmail,
      enteredPassword)

    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        enteredEmail,
        enteredPassword,
      )
      .then((user) => {
        console.log(user)
        if (user) {
          history.replace('/movies');
          return user;
        } else {
          return user.then((data) => {
            throw new Error(data.error.message);
          })
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        enteredEmail,
        enteredPassword,
      )
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: enteredName,
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
    console.log("In submit", event)
    if (isLogin) {
      signInHandler(event)
    } else {
      signUpHandler(event)
    }
  }

  return (
    <div className={css.signIn}>
      <h1 className={css.signIn__heading}>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} className={css.signIn__signUpForm}>
        {!isLogin && (
          <div className={css.signIn___control}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="filled"
              className={css.signIn___control__textfield}
              InputLabelProps={{ className: css.signIn___control__textfield__label }}
              inputProps={{ className: css.signIn___control__textfield__input }}
              fullWidth
              required
            />
          </div>
        )}
        <div className={css.signIn___control}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            variant="filled"
            className={css.signIn___control__textfield}
            InputLabelProps={{ className: css.signIn___control__textfield__label }}
            inputProps={{ className: css.signIn___control__textfield__input }}
            fullWidth
            required
          />
        </div>
        <div className={css.signIn___control}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            variant="filled"
            type={'password'}
            className={css.signIn___control__textfield}
            InputLabelProps={{ className: css.signIn___control__textfield__label }}
            inputProps={{ className: css.signIn___control__textfield__input }}
            fullWidth
            required
          />
        </div>
        <div><span className={css.signIn___control__error}>{error}</span></div>
        <button>{isLogin ? 'Login' : 'Create Account'}</button>

        <h3 className={css.signIn__toggle}
          onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </h3>
      </form>
    </div>

  );
};

export default SignIn;