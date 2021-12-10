import React, { useState } from "react";
import css from "./SignIn.module.css";
import { auth } from "../../firebase";
import { TextField, Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../UI/LoadingSpinner";
import firebase from "firebase";
import { setError } from "../../features/userSlice";

const SignIn = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(history.location.pathname);

  const googleSignInHandler = () => {
    setIsLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          let credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        let user = result.user;
        if (user) {
          return user;
        }
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        setError(errorMessage);
        // ...
      });
  };
  const signInHandler = (e) => {
    // e.preventDefault();
    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(e.email, e.password)
      .then((user) => {
        console.log(user);
        if (user) {
          history.replace("/movies");
          return user;
        } else {
          return user.then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
    setIsLoading(false);
  };

  const signUpHandler = (e) => {
    // e.preventDefault();
    auth
      .createUserWithEmailAndPassword(e.email, e.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: e.name,
        });
        history.replace("/movies");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event, props) => {
    if (event !== "") {
      if (isLogin) {
        signInHandler(event);
      } else {
        signUpHandler(event);
      }
    } else {
      console.log("Empty values.");
    }
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
  });
  console.log("isLoading", isLoading);
  return (
    <>
      <div className={css.signIn}>
        {isLoading && history.location.pathname === "/login" ? (
          <div className={css.signIn__loadingspinner}>
            <LoadingSpinner />
          </div>
        ) : null}

        <h1 className={css.signIn__heading}>{isLogin ? "Login" : "Sign Up"}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {(props) => (
            <Form>
              <Box className={css.signIn__signUpForm}>
                {!isLogin && (
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    helperText={<ErrorMessage name="name" />}
                    autocomplete="off"
                    variant="filled"
                    className={css.signIn___control__textfield}
                    InputLabelProps={{
                      className: css.signIn___control__textfield__label,
                    }}
                    inputProps={{
                      className: css.signIn___control__textfield__input,
                    }}
                    FormHelperTextProps={{
                      className: css.signIn___control__error,
                    }}
                    required
                  />
                )}

                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  helperText={<ErrorMessage name="email" />}
                  autocomplete="off"
                  variant="filled"
                  className={css.signIn___control__textfield}
                  InputLabelProps={{
                    className: css.signIn___control__textfield__label,
                  }}
                  inputProps={{
                    className: css.signIn___control__textfield__input,
                  }}
                  FormHelperTextProps={{
                    className: css.signIn___control__error,
                  }}
                  required
                />
                <Field
                  as={TextField}
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  helperText={<ErrorMessage name="password" />}
                  autocomplete="off"
                  variant="filled"
                  className={css.signIn___control__textfield}
                  InputLabelProps={{
                    className: css.signIn___control__textfield__label,
                  }}
                  inputProps={{
                    className: css.signIn___control__textfield__input,
                  }}
                  FormHelperTextProps={{
                    className: css.signIn___control__error,
                  }}
                  required
                />
                <div>
                  <span className={css.signIn___control__error}>{error}</span>
                </div>

                <Button type="submit" variant="contained" color="primary">
                  {" "}
                  {!isLogin ? "Sign up" : "Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <h4 className={css.signIn__prompt}>
          <span className={css.signIn__gray}>
            {isLogin ? "New to Netflix? " : "Already a member? "}{" "}
          </span>
          <span className={css.signIn__toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Sign up" : "Login"}
          </span>
        </h4>
        <div className={css.signIn__google}>
          <FontAwesomeIcon
            icon={faGoogle}
            size="2x"
            color="white"
            className={css.googleIcon}
          />
          <p onClick={googleSignInHandler}>Sign in with Google</p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
