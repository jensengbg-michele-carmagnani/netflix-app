import React, { useState } from "react";
import css from "./SignIn.module.css";
import { auth } from "../../firebase";
import { TextField, Button, Box } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from 'formik'


const SignIn = () => {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const signInHandler = (e) => {
    // e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        e.email,
        e.password,
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
    // e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        e.email,
        e.password,
      )
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: e.name,
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

  const submitHandler = (event, props) => {
    if (event !== "") {
      if (isLogin) {
        signInHandler(event)
      } else {
        signUpHandler(event)
      }
    } else {
      console.log("Empty values.")
    }
    setTimeout(() => {

      props.resetForm()
      props.setSubmitting(false)
    }, 2000)
  }
  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
  })

  return (
    <div className={css.signIn}>
      <h1 className={css.signIn__heading}>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
        {(props) => (
          <Form>
            <Box className={css.signIn__signUpForm}>
              {!isLogin && (
                <Field as={TextField}
                  fullWidth
                  name="name"
                  label='Name'
                  placeholder="Enter your name"
                  helperText={<ErrorMessage name="name" />}
                  autocomplete="off"
                  variant="filled"
                  className={css.signIn___control__textfield}
                  InputLabelProps={{ className: css.signIn___control__textfield__label }}
                  inputProps={{ className: css.signIn___control__textfield__input }}
                  FormHelperTextProps={{ className: css.signIn___control__error }}
                  required
                />
              )}

              <Field as={TextField}
                fullWidth
                name="email"
                label='Email'
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
                autocomplete="off"
                variant="filled"
                className={css.signIn___control__textfield}
                InputLabelProps={{ className: css.signIn___control__textfield__label }}
                inputProps={{ className: css.signIn___control__textfield__input }}
                FormHelperTextProps={{ className: css.signIn___control__error }}
                required
              />
              <Field
                as={TextField}
                fullWidth
                name='password'
                type="password"
                label='Password'
                placeholder="Enter your password"
                helperText={<ErrorMessage name="password" />}
                autocomplete="off"
                variant="filled"
                className={css.signIn___control__textfield}
                InputLabelProps={{ className: css.signIn___control__textfield__label }}
                inputProps={{ className: css.signIn___control__textfield__input }}
                FormHelperTextProps={{ className: css.signIn___control__error }}
                required
              />
              <div><span className={css.signIn___control__error}>{error}</span></div>

              <Button type='submit' variant='contained' disabled={props.isSubmitting}
                color='primary'> {!isLogin ? 'Sign up' : 'Login'}</Button>
            </Box>
          </Form>
        )}
      </Formik>
      <h4 className={css.signIn__prompt}>
        <span className={css.signIn__gray}>{isLogin ? 'New to Netflix? ' : 'Already a member? '} </span>
        <span className={css.signIn__toggle}
          onClick={switchAuthModeHandler}>
          {isLogin ? 'Sign up' : 'Login'}
        </span>
      </h4>
    </div>
  );
};

export default SignIn;
