import React, { useRef } from "react";
import { Link } from "react-router-dom";
import css from "./SignIn.module.css";
import { auth } from "../../firebase";

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then((user) => user)
      .catch((err) => {
        alert(err);
      });
  };
  const signUpHandler = (e:React.FormEvent) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
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
          <Link to="/movies">Sign in</Link>
        </button>
        <h4>
          <span className={css.signIn__gray}>New to Netflix? </span>
          <span className={css.signIn__link} onClick={signUpHandler}>
            <Link to="/movies">Sign up</Link>
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignIn;
