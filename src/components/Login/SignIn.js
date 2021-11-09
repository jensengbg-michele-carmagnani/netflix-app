import React, { useRef } from "react";
import css from "./SignIn.module.css";
import { auth } from "../../firebase";

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signInHandler = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(user => user).catch(err => {
      alert(err)
    });
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredetial) => {
        console.log(userCredetial);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className={css.signIn}>
      <form action="submit" className={css.signIn__signUpForm}>
        <h1>Sign In </h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button onClick={signInHandler} type="submit">
          Sign in
        </button>
        <h4>
          <span className={css.signIn__gray}>New to Netflix? </span>
          <span className={css.signIn__link} onClick={signUpHandler}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignIn;
