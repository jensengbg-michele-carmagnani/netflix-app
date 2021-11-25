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
    console.log("In sign up", e)

    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredetial) => {
        console.log("User credentials: ", userCredetial);
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
    console.log(event);
    console.log(isLogin);
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

        {/* <button onClick={signInHandler} type="submit">
          <Link to="/movies">Sign in</Link>
        </button> */}

        <h3 className={css.toggle}
          onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </h3>
      </form>
    </div>

  );
};

export default SignIn;


// <div className={css.signIn}>
// <form onSubmit={submitHandler} className={css.signIn__signUpForm}>
//   <div className={css.control}>
//     <TextField
//       label="email"
//       variant="outlined"
//       ref={emailRef}
//       className={css.TextFieldInput}
//       fullWidth
//       required
//     />
//   </div>
//   <div><span>{error}</span></div>
//   <div className={css.control}>
//     <TextField
//       label="password"
//       variant="outlined"
//       type={'password'}
//       ref={passwordRef}
//       fullWidth
//       required
//     />
//   </div>
//   <div><span>{error}</span></div>
//   <button onClick={signInHandler} type="submit">
//     <Link to="/movies">Sign in</Link>
//   </button>
//   <h4>
//     <span className={css.signIn__gray}>New to Netflix? </span>
//     <span className={css.signIn__link} onClick={signUpHandler}>
//       <Link to="/movies">Sign up</Link>
//     </span>
//   </h4>

// </form>
// </div>


// <div className={css.actions}>
// {!isLoading && (
//   <button>{isLogin ? 'Login' : 'Create Account'}</button>
// )}

// {isLoading && <p>Sending request...</p>}
// <button
//   className={css.toggle}
//   onClick={switchAuthModeHandler}
// >
//   {isLogin ? 'Create new account' : 'Login with existing account'}
// </button>
// </div>